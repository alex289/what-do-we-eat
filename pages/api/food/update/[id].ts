import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | string>
) {
  const session = await getSession({ req });
  const foodId = req.query.id;
  const { name, image, cheeseometer, deliverable, tags, effort } = req.body;

  if (session && !session.isAdmin) {
    res.status(401).json('Failed. Not authenticated');
    return;
  }

  if (req.method !== 'PUT') {
    return res.status(405).json('Only PUT method allowed');
  }

  const item = await prisma.food.findUnique({ where: { id: Number(foodId) } });

  if (!item) {
    return res.status(400).json('Food with id' + foodId + 'not found');
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
  res.json({ status: 'success', data: [result] });
}
