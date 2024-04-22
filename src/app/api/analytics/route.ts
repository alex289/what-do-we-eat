import { db } from '@/server/db';
import { analytics } from '@/server/db/schema';
import { revalidatePath } from 'next/cache';

import { getServerAuthSession } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerAuthSession();

  if (!session || !session.user || !session.user.email || !session.user.name) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  let { name, picked } = (await req.json()) as {
    name: string;
    picked: boolean;
  };

  try {
    name = String(name);
    picked = Boolean(picked);
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Bad request' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const existingFood = await db.query.food.findFirst({
    where: (foods, { eq }) => eq(foods.name, name),
  });

  if (!existingFood) {
    return new Response(JSON.stringify({ message: 'Food does not exist' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  revalidatePath('/analytics');

  const result = await db.insert(analytics).values({
    name: name,
    picked: picked,
    date: Date.now.toString(),
  });

  return new Response(JSON.stringify({ status: 'success', data: result }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function GET() {
  const items = await db.query.analytics.findMany();
  return new Response(JSON.stringify({ status: 'success', data: items }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
