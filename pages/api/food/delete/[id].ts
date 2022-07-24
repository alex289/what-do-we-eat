import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';
import { authOptions } from 'pages/api/auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | string>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  const foodId = req.query.id;

  if (session && !session.isAdmin) {
    res.status(401).json('Failed. Not authenticated');
    return;
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json('Only DELETE method allowed');
  }

  const result = await prisma.food.delete({
    where: { id: Number(foodId) },
  });
  res.json({ status: 'success', data: [result] });
}
