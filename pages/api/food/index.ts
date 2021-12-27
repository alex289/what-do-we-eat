import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { ApiResponse } from '@/types/apiResponse';
import { Food } from '@/types/food';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const items = await prisma.food.findMany();
  res.json({ status: 'success', data: items as unknown as Food[] });
}
