import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

import type { ApiResponse } from '@/types/apiResponse';
import { analytics } from '@prisma/client';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<analytics> | string>
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json('Failed. Not authenticated');
    return;
  }

  let { name, picked } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json('Only POST method allowed');
  }

  try {
    name = String(name);
    picked = Boolean(picked);
  } catch (e) {
    return res.status(400).json('Failed. Invalid request');
  }

  const existingFood = await prisma.food.findFirst({
    where: {
      name,
    },
  });

  if (!existingFood) {
    return res.status(400).json('Failed. Food does not exist');
  }

  const result = await prisma.analytics.create({
    data: {
      name,
      picked,
    },
  });
  res.json({ status: 'success', data: result });
}
