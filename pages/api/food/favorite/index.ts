import type { NextApiRequest, NextApiResponse } from 'next';

import { favorite } from '@prisma/client';

import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<favorite[]>>
) {
  const session = await getSession({ req });

  const onlySelfEmail = (user: string) => {
    if (!session) {
      return '-';
    }

    return user === session.user?.email ? user : '-';
  };

  const items = await prisma.favorite.findMany();
  const data = items.map(
    (item) =>
      ({
        id: item.id,
        user: onlySelfEmail(item.user),
      } as favorite)
  );

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=3600');
  return res.json({ status: 'success', data });
}
