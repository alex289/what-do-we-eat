import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | string>
) {
  const session = await getSession({ req });

  if (session && !session.isAdmin) {
    res.status(401).json('Failed. Not authenticated');
    return;
  }

  const { name, image, cheeseometer, deliverable, nutrition, effort } =
    req.body;

  if (req.method !== 'POST') {
    return res.status(405).json('Only POST method allowed');
  }

  const result = await prisma.food.create({
    data: {
      name: name,
      image: image,
      cheeseometer: cheeseometer,
      deliverable: deliverable,
      nutrition: nutrition,
      effort: effort,
    },
  });
  res.json({ status: 'success', data: [result] });
}
