import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

import type { analytics } from '@prisma/client';
import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<analytics[]> | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET method allowed' });
  }

  const items = await prisma.analytics.findMany();
  res.json({ status: 'success', data: items });
}
