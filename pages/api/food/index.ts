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

  const sort = req.query.sort;
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
      [sort ? 'name' : 'id']: sort === 'desc' ? 'desc' : 'asc',
    },
  });

  const cheeseometer = parseInt(req.query.cheeseometer as string);
  if (cheeseometer) {
    items = items.filter((item) => item.cheeseometer === cheeseometer);
  }

  const deliverable = req.query.deliverable;
  if (deliverable) {
    items = items.filter((item) => item.deliverable.toString() === deliverable);
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
