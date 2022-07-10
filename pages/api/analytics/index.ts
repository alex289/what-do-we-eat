import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

import type { analytics } from '@prisma/client';
import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<analytics[]>>
) {
  const items = await prisma.analytics.findMany();
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=3600');
  res.json({ status: 'success', data: items });
}
