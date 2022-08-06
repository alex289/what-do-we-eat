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

  if (session && !session.isAdmin) {
    res.status(401).json({ message: 'Failed. Not authenticated' });
    return;
  }

  const { name, image, cheeseometer, deliverable, tags, effort } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method allowed' });
  }

  const existingFood = await prisma.food.findUnique({
    where: { name },
  });

  if (existingFood) {
    return res.status(400).json({ message: 'Failed. Food already exists' });
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
  res.json({ status: 'success', data: [result] });
}
