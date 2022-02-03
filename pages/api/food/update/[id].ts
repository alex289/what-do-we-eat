import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

import type { ApiResponse } from '@/types/apiResponse';
import type { Food } from '@/types/food';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | string>
) {
  const session = await getSession({ req });
  const foodId = req.query.id;
  const { name, image, cheeseometer, size, deliverable, effort } = req.body;

  if (session && session.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    res.status(401).json('Failed. Not authenticated');
    return;
  }

  if (req.method !== 'PUT') {
    return res.status(405).json('Only PUT method allowed');
  }

  const result = await prisma.food.update({
    where: { id: Number(foodId) },
    data: {
      name: name,
      image: image,
      size: size,
      cheeseometer: cheeseometer,
      deliverable: deliverable,
      effort: effort,
    },
  });
  res.json({ status: 'success', data: result as unknown as Food[] });
}
