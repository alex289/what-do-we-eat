import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';
import { authOptions } from 'pages/api/auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse } from '@/types/apiResponse';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { message: string }>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const foodId = req.query.id;
  const { name, image, cheeseometer, deliverable, tags, effort } = req.body;

  if (session && !session.isAdmin) {
    res.status(401).json({ message: 'Failed. Not authenticated' });
    return;
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Only PUT method allowed' });
  }

  if (
    !foodId ||
    !name ||
    !image ||
    !cheeseometer ||
    !deliverable ||
    !tags ||
    !effort
  ) {
    return res.status(400).json({ message: 'Invalid Request' });
  }

  const item = await prisma.food.findUnique({ where: { id: Number(foodId) } });

  if (!item) {
    return res
      .status(400)
      .json({ message: `Food with id ${foodId} not found` });
  }

  const result = await prisma.food.update({
    where: { id: Number(foodId) },
    data: {
      name: name,
      image: image,
      cheeseometer: cheeseometer,
      deliverable: deliverable,
      tags: tags,
      effort: effort,
    },
  });
  res.json({ status: 'success', data: [result] });
}
