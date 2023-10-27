import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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

  const item = await prisma.food.findUnique({ where: { id: Number(foodId) } });

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

  const result = await prisma.favorite.create({
    data: {
      id: Number(foodId),
      user: session.user.email,
    },
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

  const item = await prisma.food.findUnique({ where: { id: Number(foodId) } });

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

  await prisma.favorite.deleteMany({
    where: {
      id: Number(foodId),
      user: session.user.email,
    },
  });

  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
