import { unstable_getServerSession } from 'next-auth/next';

import { prisma } from '@/lib/prisma';
import { authOptions } from 'pages/api/auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { favorite } from '@prisma/client';
import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<favorite[]> | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET method allowed' });
  }

  const session = await unstable_getServerSession(req, res, authOptions);

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
