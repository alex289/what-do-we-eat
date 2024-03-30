import { revalidatePath } from 'next/cache';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const queries = new URLSearchParams(req.url);

  const sort = queries.get('sort');
  const page = parseInt(queries.get('page')!) || 1;
  const amount = parseInt(queries.get('amount')!) || 40;
  const search = queries.get('search') ?? '';

  let items = await prisma.food.findMany({
    take: amount,
    skip: (page - 1) * amount,
    where: {
      name: {
        contains: search,
      },
    },
    orderBy: {
      [sort ? 'name' : 'id']: sort === 'desc' ? 'desc' : 'asc',
    },
  });

  const cheeseometer = parseInt(queries.get('cheeseometer')!);
  if (cheeseometer) {
    items = items.filter((item) => item.cheeseometer === cheeseometer);
  }

  const deliverable = queries.get('deliverable');
  if (deliverable) {
    items = items.filter((item) => item.deliverable.toString() === deliverable);
  }

  const tags = queries.get('tags');
  if (tags) {
    items = items.filter((item) => item.tags === tags);
  }

  const effort = parseInt(queries.get('effort')!);
  if (effort) {
    items = items.filter((item) => item.effort === effort);
  }

  return new Response(JSON.stringify({ status: 'success', data: items }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(req: Request) {
  const session = await getServerAuthSession();

  if (session && !session.user.isAdmin) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { name, image, cheeseometer, deliverable, tags, effort } =
    (await req.json()) as {
      name: string;
      image: string;
      cheeseometer: number;
      deliverable: boolean;
      tags: string;
      effort: number;
    };

  const existingFood = await prisma.food.findFirst({
    where: { name },
  });

  if (existingFood) {
    return new Response(
      JSON.stringify({ message: `Food '${name}' already exists` }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  const result = await prisma.food.create({
    data: {
      name: name,
      image: image,
      cheeseometer: cheeseometer,
      deliverable: deliverable,
      tags: tags,
      effort: effort,
    },
  });

  revalidatePath('/');
  revalidatePath('/dashboard');

  return new Response(JSON.stringify({ status: 'success', data: [result] }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
