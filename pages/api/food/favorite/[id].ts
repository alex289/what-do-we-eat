import { unstable_getServerSession } from 'next-auth/next';

import { prisma } from '@/lib/prisma';
import logger from '@/lib/logger';
import { authOptions } from 'pages/api/auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { favorite } from '@prisma/client';
import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<favorite> | { message: string }>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const foodId = req.query.id;

  if (!session || !session.user?.email) {
    res.status(401).json({ message: 'Unsufficient permissions' });
    return;
  }

  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res
      .status(405)
      .json({ message: 'Only POST or DELETE method allowed' });
  }

  if (!foodId) {
    return res.status(400).json({ message: 'No food id provided' });
  }

  const item = await prisma.food.findUnique({ where: { id: Number(foodId) } });

  if (!item) {
    return res.status(400).json({ message: `Food ${foodId} not found` });
  }

  if (req.method === 'DELETE') {
    await prisma.favorite.deleteMany({
      where: {
        id: Number(foodId),
        user: session.user.email,
      },
    });

    logger.info(`Deleted favorite ${foodId}`);

    return res.json({ message: 'success' });
  }

  const result = await prisma.favorite.create({
    data: {
      id: Number(foodId),
      user: session.user.email,
    },
  });

  logger.info(`Created favorite ${result.id}`, result);

  res.json({ status: 'success', data: result });
}
