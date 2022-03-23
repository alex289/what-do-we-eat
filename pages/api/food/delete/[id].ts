import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

import type { ApiResponse } from '@/types/apiResponse';
import type { Food } from '@/types/food';
import { log } from '@/lib/log';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | string>
) {
  const session = await getSession({ req });
  const foodId = req.query.id;

  if (session && !session.isAdmin) {
    res.status(401).json('Failed. Not authenticated');
    return;
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json('Only DELETE method allowed');
  }

  const result = await prisma.food.delete({
    where: { id: Number(foodId) },
  });

  log(`Deleted: ${result.name} (${foodId})`);
  res.json({ status: 'success', data: result as unknown as Food[] });
}
