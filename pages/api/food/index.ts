import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET method allowed' });
  }

  const orderBy = req.query.orderBy;
  const page = parseInt(req.query.page as string) || 1;
  const take = parseInt(req.query.take as string) || 100;
  const search = req.query.search;

  const items = await prisma.food.findMany({
    take,
    skip: (page - 1) * take,
    where: {
      name: {
        contains: search as string,
      },
    },
    orderBy: {
      [orderBy ? 'name' : 'id']: orderBy === 'desc' ? 'desc' : 'asc',
    },
  });
  res.json({ status: 'success', data: items });
}
