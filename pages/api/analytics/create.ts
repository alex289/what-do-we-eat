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

  const { name, picked } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json('Only POST method allowed');
  }

  const result = await prisma.analytics.create({
    data: {
      name,
      picked,
    },
  });
  res.json({ status: 'success', data: result });
}
