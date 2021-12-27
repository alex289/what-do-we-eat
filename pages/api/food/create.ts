import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { ApiResponse } from '@/types/apiResponse';
import { Food } from '@/types/food';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | string>
) {
  const { name, size, deliverable, effort } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json('Only POST method allowed');
  }

  const basicAuth = req.headers.authorization;

  if (!basicAuth) {
    return res.status(401).json('Unauthorized');
  }

  const auth = basicAuth.split(' ')[1];
  const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

  if (
    user !== process.env.AUTH_ADMIN_USERNAME &&
    pwd !== process.env.AUTH_ADMIN_PASSWORD
  ) {
    return res.status(401).json('Unauthorized');
  }

  const result = await prisma.food.create({
    data: {
      name: name,
      size: size,
      deliverable: deliverable,
      effort: effort,
    },
  });
  res.json({ status: 'success', data: result as unknown as Food[] });
}
