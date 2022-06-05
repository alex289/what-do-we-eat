import type { NextApiRequest, NextApiResponse } from 'next';

import { favorite } from '@prisma/client';

import prisma from '@/lib/prisma';

import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<favorite[]>>
) {
  const items = await prisma.favorite.findMany();
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=3600');
  res.json({ status: 'success', data: items });
}
