import { unstable_getServerSession } from 'next-auth/next';

import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { analytics } from '@prisma/client';
import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<analytics> | { message: string }>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'Failed. Not authenticated' });
    return;
  }

  let { name, picked } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method allowed' });
  }

  try {
    name = String(name);
    picked = Boolean(picked);
  } catch (e) {
    return res.status(400).json({ message: 'Failed. Invalid request' });
  }

  const existingFood = await prisma.food.findUnique({
    where: {
      name,
    },
  });

  if (!existingFood) {
    return res.status(400).json({ message: 'Failed. Food does not exist' });
  }

  const result = await prisma.analytics.create({
    data: {
      name,
      picked,
    },
  });
  res.json({ status: 'success', data: result });
}
