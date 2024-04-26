import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

import HeartIcon from '@/components/icons/HeartIcon';

import type { Favorite } from '@/server/db/types';

interface Props {
  foodId: number;
  favorite: Favorite[] | undefined;
  emailAddresses: string[] | undefined;
}

const Favorite = ({ foodId, favorite, emailAddresses }: Props) => {
  const [favouriteCount, setFavoriteCount] = useState(favorite?.length ?? 0);
  const { mutate } = useSWRConfig();

  useEffect(() => setFavoriteCount(favorite?.length ?? 0), [favorite]);

  const isFavorite = useMemo(() => {
    return (
      favouriteCount > (favorite?.length ?? 0) ||
      favorite?.find((x) => emailAddresses?.includes(x.user)) !== undefined
    );
  }, [favorite, favouriteCount, emailAddresses]);

  async function Add() {
    const res = await fetch('/api/food/favorite/' + foodId, { method: 'POST' });

    if (res.status === 200) {
      setFavoriteCount(favouriteCount + 1);
      await mutate('/api/food/favorite');
      toast.success('Added to favorites');
    } else {
      const data = (await res.json()) as { message: string };
      toast.error('Failed adding to favorites: ' + data.message);
    }
  }

  async function Remove() {
    const res = await fetch('/api/food/favorite/' + foodId, {
      method: 'DELETE',
    });

    if (res.status === 200) {
      setFavoriteCount(favouriteCount - 1);
      await mutate('/api/food/favorite');
      toast.success('Removed from favorites');
    } else {
      const data = (await res.json()) as { message: string };
      toast.error('Failed removing from favorites: ' + data.message);
    }
  }

  if (!emailAddresses) {
    return <></>;
  }

  return (
    <span className="ml-auto flex">
      <button
        type="button"
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
