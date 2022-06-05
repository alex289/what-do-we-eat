import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

import type { favorite } from '@prisma/client';
import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<favorite> | string>
) {
  const session = await getSession({ req });
  const foodId = req.query.id;

  if (!session || !session.user?.email) {
    res.status(401).json('Failed. Not authenticated');
    return;
  }

  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).json('Only POST or DELETE method allowed');
  }

  const item = await prisma.food.findUnique({ where: { id: Number(foodId) } });

  if (!item) {
    return res.status(400).json('Food with id' + foodId + 'not found');
  }

  if (req.method === 'DELETE') {
    await prisma.favorite.deleteMany({
      where: {
        id: Number(foodId),
        user: session.user.email,
      },
    });
    res.json('Success');
    return;
  }

  const result = await prisma.favorite.create({
    data: {
      id: Number(foodId),
      user: session.user.email,
    },
  });

  res.json({ status: 'success', data: result });
}
