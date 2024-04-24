import { db } from '@/server/db';
import { currentUser } from '@clerk/nextjs/server';

import type { Favorite } from '@/server/db/types';

export async function GET() {
  const activeUser = await currentUser();

  const onlySelfEmail = (user: string) => {
    if (!user) {
      return '-';
    }

    return activeUser?.emailAddresses
      .flatMap((emailAddresses) => emailAddresses.emailAddress)
      .includes(user)
      ? user
      : '-';
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
