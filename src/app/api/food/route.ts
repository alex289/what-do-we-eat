import { db } from '@/server/db';
import { food } from '@/server/db/schema';
import { ratelimit } from '@/server/ratelimit';
import { type PaginatedApiResponse } from '@/types/apiResponse';
import { auth } from '@clerk/nextjs/server';
import { count, like } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const queries = req.nextUrl.searchParams;

  const sort = queries.get('sort');
  const page = parseInt(queries.get('page')!) || 1;
  const amount = parseInt(queries.get('amount')!) || 40;
  const search = queries.get('search') ?? '';

  const itemCount = await db
    .select({ count: count() })
    .from(food)
    .where(like(food.name, search.length > 1 ? `%${search}%` : '%'));

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

  const response: PaginatedApiResponse = {
    status: 'success',
    data: {
      count: itemCount[0]?.count ?? 0,
      items: items,
      page: page,
      pageSize: amount,
    },
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(req: Request) {
  const { sessionClaims, userId } = auth();

  if (!sessionClaims || sessionClaims.admin !== true) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { success } = await ratelimit.limit(userId);

  if (!success) {
    return new Response(JSON.stringify({ message: 'Rate limit exceeded' }), {
      status: 429,
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

  await db.insert(food).values({
    name: name,
    image: image,
    cheeseometer: cheeseometer,
    deliverable: deliverable,
    tags: tags,
    effort: effort,
  });

  revalidatePath('/');
  revalidatePath('/dashboard');

  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
