import { useMemo, useState } from 'react';

import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

import HeartIcon from '@/components/icons/HeartIcon';

import type { favorite } from '@prisma/client';

type Props = {
  foodId: number;
  favorite: favorite[] | undefined;
};

const Favorite = ({ foodId, favorite }: Props) => {
  const [favouriteCount, setFavoriteCount] = useState(favorite?.length ?? 0);
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const isFavorite = useMemo(() => {
    return favouriteCount > (favorite?.length ?? 0) ||
      favorite?.find((x) => x.user === session?.user?.email) !== undefined
      ? true
      : false;
  }, [favorite, favouriteCount, session]);

  async function Add() {
    const res = await fetch('/api/food/favorite/' + foodId, { method: 'POST' });

    if (res.status === 200) {
      setFavoriteCount(favouriteCount + 1);
      mutate('/api/food/favorite');
      toast.success('Added to favorites');
    } else {
      const data = await res.json();
      toast.error('Failed adding to favorites: ' + data.message);
    }
  }

  async function Remove() {
    const res = await fetch('/api/food/favorite/' + foodId, {
      method: 'DELETE',
    });

    if (res.status === 200) {
      setFavoriteCount(favouriteCount - 1);
      mutate('/api/food/favorite');
      toast.success('Removed from favorites');
    } else {
      const data = await res.json();
      toast.error('Failed removing from favorites: ' + data.message);
    }
  }

  if (!session) {
    return <></>;
  }

  return (
    <span className="ml-auto flex">
      <button
        onClick={() => (isFavorite ? Remove() : Add())}
        className="umami--click--favorite-food"
        aria-label="Favorites">
        <HeartIcon />
      </button>{' '}
      <span className={`ml-2 ${isFavorite ? 'text-red-500' : ''}`}>
        {favouriteCount}
      </span>
    </span>
  );
};

export default Favorite;
