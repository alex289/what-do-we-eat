import { Suspense, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import { useTheme } from 'next-themes';
import axios from 'axios';

import { prisma } from '@/lib/prisma';
import fetcher from '@/lib/fetcher';
import { handleFood } from '@/lib/filter';

import Layout from '@/components/layout';

const Food = dynamic(() => import('@/components/food'), {
  suspense: true,
  ssr: false,
});
const Dialog = dynamic(() => import('@/components/dialog'), {
  suspense: true,
  ssr: false,
});

import type { GetStaticProps } from 'next';
import type { favorite } from '@prisma/client';
import type { FilterConfig, FoodConfig } from '@/types/config';
import type { ApiResponse } from '@/types/apiResponse';

type Props = {
  fallbackData: ApiResponse;
  fallbackFavoritesData: ApiResponse<favorite[]>;
};

export default function Index({ fallbackData, fallbackFavoritesData }: Props) {
  const { data: session } = useSession();
  const { resolvedTheme } = useTheme();
  const [clicked, setClicked] = useState(false);
  const [btnTitle, setBtnTitle] = useState('Get random food');
  const [foodConfig, setFoodConfig] = useState<FoodConfig>({
    filter: false,
    random: false,
    search: false,
    searchInput: '',
  });
  const [filter, setFilter] = useState<FilterConfig>({
    effort: '',
    deliverable: '',
    cheeseometer: '',
    tags: '',
  });

  const { data, error } = useSWR<ApiResponse>('/api/food', fetcher, {
    fallbackData,
  });
  const { data: favoriteData } = useSWR<ApiResponse<favorite[]>>(
    '/api/food/favorite',
    fetcher,
    { fallbackData: fallbackFavoritesData }
  );

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();

    let isClicked = false;
    if (clicked) {
      setClicked(false);
      isClicked = false;
    } else {
      setClicked(true);
      isClicked = true;
    }
    setBtnTitle(isClicked ? 'Get food list' : 'Get random food');

    setFoodConfig({
      filter: foodConfig.filter,
      random: isClicked,
      search: foodConfig.search,
      searchInput: foodConfig.searchInput,
    });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    setFoodConfig({
      filter: foodConfig.filter,
      random: foodConfig.random,
      search: true,
      searchInput: e.target.value,
    });
  }

  async function submitAnalytics(picked: boolean) {
    const res = await axios.post('/api/analytics/create', {
      name: memoizedFoodList[0].name,
      picked,
    });

    if (res.status !== 200) {
      toast.error(
        `Failed saving choice '${picked ? 'Good one' : 'Bad one'}': ${
          res.statusText
        }`
      );
      return;
    }

    toast.success(`Submitted choice '${picked ? 'Good one' : 'Bad one'}'`);
  }

  const memoizedFoodList = useMemo(
    () => handleFood(data?.data || [], foodConfig, filter),
    [data, foodConfig, filter]
  );

  if (error) {
    return (
      <Layout>
        <div className="m-10">Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ToastContainer
        transition={Zoom}
        autoClose={2500}
        newestOnTop={true}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />
      <button
        type="button"
        className="btn btn-primary ml-3 normal-case"
        onClick={handleClick}>
        {btnTitle}
      </button>
      <Suspense>
        <Dialog
          filterer={setFilter}
          config={foodConfig}
          setConfig={setFoodConfig}
        />
      </Suspense>
      <input
        onChange={handleInput}
        type="text"
        placeholder="Search for food..."
        className="input input-bordered input-primary ml-3 bg-white text-black placeholder-black dark:bg-gray-800 dark:text-white dark:placeholder-white"
      />
      {foodConfig.random && session && (
        <div className="mb-2 ml-1 p-2">
          <button
            onClick={() => submitAnalytics(true)}
            className="btn mr-1 border-none bg-green-600 normal-case text-white ring-green-400 hover:bg-green-700 hover:ring-4">
            Good choice
          </button>
          <button
            onClick={() => submitAnalytics(false)}
            className="btn ml-1 mr-1 border-none bg-red-600 normal-case text-white ring-red-400 hover:bg-red-700 hover:ring-4">
            Bad choice
          </button>
        </div>
      )}
      {!data?.data && <progress className="progress progress-primary w-full" />}
      <Suspense>
        {data?.data && favoriteData?.data && (
          <Food foodList={memoizedFoodList} favorite={favoriteData?.data} />
        )}
      </Suspense>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const entries = await prisma.food.findMany();
  const fallbackData: ApiResponse = { status: 'Success', data: entries };

  const favorites = await prisma.favorite.findMany();
  const fallbackFavoritesData: ApiResponse<favorite[]> = {
    status: 'Success',
    data: favorites,
  };

  return {
    props: {
      fallbackData,
      fallbackFavoritesData,
    },
  };
};
