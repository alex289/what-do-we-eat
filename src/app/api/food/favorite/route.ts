import { db } from '@/server/db';

import { getServerAuthSession } from '@/lib/auth';

import type { Favorite } from '@/server/db/types';

export async function GET() {
  const session = await getServerAuthSession();

  const onlySelfEmail = (user: string) => {
    if (!session) {
      return '-';
    }

    return user === session.user?.email ? user : '-';
  };

  const items = await db.query.favorite.findMany();
  const data = items.map(
    (item) =>
      ({
        id: item.id,
        user: onlySelfEmail(item.user),
      }) as Favorite,
  );

  return new Response(JSON.stringify({ status: 'success', data }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
