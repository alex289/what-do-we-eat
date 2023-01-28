import { getServerSession } from 'next-auth/next';

import { prisma } from '@/lib/prisma';
import { authOptions } from 'pages/api/auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { message: string }>
) {
  const session = await getServerSession(req, res, authOptions);
  const foodId = req.query.id;
  const { name, image, cheeseometer, deliverable, tags, effort } = req.body;

  if (session && !session.user.isAdmin) {
    res.status(401).json({ message: 'Unsufficient permissions' });
    return;
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Only PUT method allowed' });
  }

  const item = await prisma.food.findMany({ where: { id: Number(foodId) } });

  if (!item) {
    return res.status(400).json({ message: `Food '${foodId}' not found` });
  }

  const existingFoodByName = await prisma.food.findFirst({ where: { name } });

  if (existingFoodByName && existingFoodByName.id !== Number(foodId)) {
    return res.status(400).json({ message: `Food '${name}' already exists` });
  }

  const result = await prisma.food.update({
    where: { id: Number(foodId) },
    data: {
      name: name,
      image: image,
      cheeseometer: cheeseometer,
      deliverable: deliverable,
      tags: tags,
      effort: effort,
    },
  });
  await prisma.analytics.updateMany({
    where: { id: Number(foodId) },
    data: {
      name,
    },
  });

  await res.revalidate('/');
  await res.revalidate('/dashboard');

  res.json({ status: 'success', data: [result] });
}
