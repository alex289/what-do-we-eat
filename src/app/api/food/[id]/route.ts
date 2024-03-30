import { revalidatePath } from 'next/cache';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerAuthSession();
  const foodId = params.id;
  const { name, image, cheeseometer, deliverable, tags, effort } =
    (await req.json()) as {
      name: string;
      image: string;
      cheeseometer: number;
      deliverable: boolean;
      tags: string;
      effort: number;
    };

  if (session && !session.user.isAdmin) {
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

  const item = await prisma.food.findMany({ where: { id: Number(foodId) } });

  if (!item) {
    return new Response(
      JSON.stringify({ message: `Food '${foodId}' not found` }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  const existingFoodByName = await prisma.food.findFirst({ where: { name } });

  if (existingFoodByName && existingFoodByName.id !== Number(foodId)) {
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
  await prisma.analytics.updateMany({
    where: { id: Number(foodId) },
    data: {
      name,
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

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerAuthSession();

  const foodId = params.id;

  if (session && !session.user.isAdmin) {
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

  const existingFood = await prisma.food.findUnique({
    where: {
      id: Number(foodId),
    },
  });

  if (!existingFood) {
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

  const result = await prisma.food.delete({
    where: { id: Number(foodId) },
  });
  await prisma.favorite.deleteMany({ where: { id: Number(foodId) } });
  await prisma.analytics.deleteMany({ where: { id: Number(foodId) } });

  revalidatePath('/');
  revalidatePath('/dashboard');

  return new Response(JSON.stringify({ status: 'success', data: [result] }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
