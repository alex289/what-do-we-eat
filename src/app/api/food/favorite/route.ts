import { type favorite } from '@prisma/client';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerAuthSession();

  const onlySelfEmail = (user: string) => {
    if (!session) {
      return '-';
    }

    return user === session.user?.email ? user : '-';
  };

  const items = await prisma.favorite.findMany();
  const data = items.map(
    (item) =>
      ({
        id: item.id,
        user: onlySelfEmail(item.user),
      }) as favorite,
  );

  return new Response(JSON.stringify({ status: 'success', data }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
