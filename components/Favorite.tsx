import { useMemo, useState } from 'react';

import { useSession } from 'next-auth/react';
import axios from 'axios';
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
    const res = await axios.post('/api/food/favorite/' + foodId);

    if (res.status === 200) {
      setFavoriteCount(favouriteCount + 1);
      mutate('/api/food/favorite');
      toast.success('Added to favorites');
    } else {
      toast.error('Something went wrong :(');
    }
  }

  async function Remove() {
    const res = await axios.delete('/api/food/favorite/' + foodId);

    if (res.status === 200) {
      setFavoriteCount(favouriteCount - 1);
      mutate('/api/food/favorite');
      toast.success('Removed from favorites');
    } else {
      toast.error('Something went wrong :(');
    }
  }

  if (!session) {
    return <></>;
  }

  return (
    <span className="ml-auto flex">
      <button
        onClick={() => (isFavorite ? Remove() : Add())}
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
