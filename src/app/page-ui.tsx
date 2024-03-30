'use client';

import { type Session } from 'next-auth';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { Suspense, useMemo, useState } from 'react';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import fetcher from '@/lib/fetcher';
import { handleFood } from '@/lib/filter';
import { useDebounce } from '@/lib/useDebounce';

import type { ApiResponse } from '@/types/apiResponse';
import type { FilterConfig } from '@/types/config';
import type { favorite } from '@prisma/client';

const Food = dynamic(() => import('@/components/food'), {
  suspense: true,
});
const Dialog = dynamic(() => import('@/components/dialog'), {
  suspense: true,
});

export default function IndexPage({ session }: { session: Session | null }) {
  const { resolvedTheme } = useTheme();

  const [clicked, setClicked] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [btnTitle, setBtnTitle] = useState('Get random food');
  const [randomizer, setRandomizer] = useState(false);
  const [filter, setFilter] = useState<FilterConfig>({
    sort: '',
    amount: 40,
    effort: '',
    deliverable: '',
    cheeseometer: '',
    tags: '',
  });

  const { data, error } = useSWR<ApiResponse, string>(
    `/api/food?page=${page}
    ${debouncedSearch !== '' ? '&search=' + debouncedSearch : ''}
    ${filter.sort !== '' ? '&sort=' + filter.sort : ''}
    ${filter.amount !== 40 ? '&amount=' + filter.amount : ''}
    ${filter.effort !== '' ? '&effort=' + filter.effort : ''}
    ${filter.deliverable !== '' ? '&deliverable=' + filter.deliverable : ''}
    ${filter.cheeseometer !== '' ? '&cheeseometer=' + filter.cheeseometer : ''}
    ${filter.tags !== '' ? '&tags=' + filter.tags : ''}`,
    fetcher,
  );
  const { data: favoriteData } = useSWR<ApiResponse<favorite[]>>(
    '/api/food/favorite',
    fetcher,
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
    setRandomizer(isClicked);
  }

  async function submitAnalytics(picked: boolean) {
    const res = await fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        name: memoizedFoodList[0]?.name,
        picked,
      }),
    });

    const data = (await res.json()) as { message: string };

    if (res.status !== 200) {
      toast.error(
        `Failed saving choice '${picked ? 'Good one' : 'Bad one'}': ${
          data.message
        }`,
      );
      return;
    }

    toast.success(`Submitted choice '${picked ? 'Good one' : 'Bad one'}'`);
  }

  const memoizedFoodList = useMemo(
    () => handleFood(data?.data ?? [], randomizer),
    [data, randomizer],
  );

  if (error) {
    return <div className="m-10">Failed to load</div>;
  }

  return (
    <div>
      <ToastContainer
        transition={Zoom}
        autoClose={2500}
        newestOnTop={true}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />
      <div className="mb-4 flex flex-col sm:flex-row">
        <div className="mx-2 flex justify-between sm:block 2xl:mx-8">
          <Button
            className="umami--click--random-food mx-3"
            onClick={handleClick}>
            {btnTitle}
          </Button>
          <Suspense>
            <Dialog filter={filter} filterer={setFilter} />
          </Suspense>
        </div>

        <Input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="ml-1 w-64"
        />
      </div>

      {randomizer && session && (
        <div className="mb-2 ml-3 flex gap-3 p-2 2xl:ml-7">
          <Button
            className="bg-green-600 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-800"
            onClick={() => submitAnalytics(true)}>
            Good choice
          </Button>

          <Button variant="destructive" onClick={() => submitAnalytics(false)}>
            Bad choice
          </Button>
        </div>
      )}
      <Suspense>
        {data?.data && favoriteData?.data && (
          <Food
            foodList={memoizedFoodList}
            favorite={favoriteData?.data}
            session={session}
          />
        )}
      </Suspense>

      <ul className="mx-auto my-4 flex items-center justify-center -space-x-px">
        <li>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="ml-0 block rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </li>
        <li>
          <div className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {page}
          </div>
        </li>
        <li>
          <button
            disabled={data?.data.length !== filter.amount}
            onClick={() => setPage(page + 1)}
            className="block rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}
