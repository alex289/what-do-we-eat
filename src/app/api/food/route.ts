import { db } from '@/server/db';
import { food } from '@/server/db/schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function GET(req: Request) {
  const queries = new URLSearchParams(req.url);

  const sort = queries.get('sort');
  const page = parseInt(queries.get('page')!) || 1;
  const amount = parseInt(queries.get('amount')!) || 40;
  const search = queries.get('search') ?? '';

  let items = await db.query.food.findMany({
    limit: amount,
    offset: (page - 1) * amount,
    where: (foods, { like }) =>
      like(foods.name, search.length > 1 ? `%${search}%` : '%'),
    orderBy: (foods, { asc, desc }) => [
      sort === 'desc'
        ? desc(sort ? foods.name : foods.id)
        : asc(sort ? foods.name : foods.id),
    ],
  });

  // Todo: These filters should be moved to the database query
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
  const { sessionClaims } = auth();

  if (!sessionClaims || sessionClaims.admin !== true) {
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

  const existingFood = await db.query.food.findFirst({
    where: (foods, { eq }) => eq(foods.name, name),
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

  const result = await db.insert(food).values({
    name: name,
    image: image,
    cheeseometer: cheeseometer,
    deliverable: deliverable,
    tags: tags,
    effort: effort,
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
