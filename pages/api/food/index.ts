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

  let items = await prisma.food.findMany({
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

  const cheesometer = parseInt(req.query.cheesometer as string);
  if (cheesometer) {
    items = items.filter((item) => item.cheeseometer === cheesometer);
  }

  const deliverable =
    req.query.deliverable === 'true' || req.query.deliverable === 'false'
      ? req.query.deliverable
      : undefined;
  if (deliverable) {
    items = items.filter((item) => item.deliverable === Boolean(deliverable));
  }

  const tags = req.query.tags;
  if (tags) {
    items = items.filter((item) => item.tags === tags);
  }

  const effort = parseInt(req.query.effort as string);
  if (effort) {
    items = items.filter((item) => item.effort === effort);
  }

  res.json({ status: 'success', data: items });
}
