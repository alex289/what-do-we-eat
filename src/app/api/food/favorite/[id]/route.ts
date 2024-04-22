import { db } from '@/server/db';
import { favorite } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';

import { getServerAuthSession } from '@/lib/auth';

export async function PUT(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerAuthSession();
  const foodId = params.id;

  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({ message: 'Unsufficient permissions' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  if (!foodId) {
    return new Response(JSON.stringify({ message: 'No food id provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const item = await db.query.food.findFirst({
    where: (foods, { eq }) => eq(foods.id, Number(foodId)),
  });

  if (!item) {
    return new Response(
      JSON.stringify({ message: `Food '${foodId}' does not exist` }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  const result = await db.insert(favorite).values({
    id: Number(foodId),
    user: session.user.email,
  });

  return new Response(JSON.stringify({ status: 'success', data: result }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerAuthSession();
  const foodId = params.id;

  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({ message: 'Unsufficient permissions' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  if (!foodId) {
    return new Response(JSON.stringify({ message: 'No food id provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const item = await db.query.food.findFirst({
    where: (foods, { eq }) => eq(foods.id, Number(foodId)),
  });

  if (!item) {
    return new Response(
      JSON.stringify({ message: `Food '${foodId}' does not exist` }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  await db
    .delete(favorite)
    .where(
      and(
        eq(favorite.id, Number(foodId)),
        eq(favorite.user, session.user.email),
      ),
    );

  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
