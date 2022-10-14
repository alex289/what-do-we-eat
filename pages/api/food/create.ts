import { unstable_getServerSession } from 'next-auth/next';

import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { message: string }>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session && !session.user.isAdmin) {
    res.status(401).json({ message: 'Unsufficient permissions' });
    return;
  }

  const { name, image, cheeseometer, deliverable, tags, effort } = req.body;
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method allowed' });
  }

  const existingFood = await prisma.food.findFirst({
    where: { name },
  });

  if (existingFood) {
    console.log(name);
    return res.status(400).json({ message: `Food '${name}' already exists` });
  }

  const result = await prisma.food.create({
    data: {
      name: name,
      image: image,
      cheeseometer: cheeseometer,
      deliverable: deliverable,
      tags: tags,
      effort: effort,
    },
  });

  await res.revalidate('/');
  await res.revalidate('/dashboard');

  res.json({ status: 'success', data: [result] });
}
