'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

import useSWR from 'swr';
import { ToastContainer, Zoom } from 'react-toastify';
import { useTheme } from 'next-themes';

import fetcher from '@/lib/fetcher';
import { useDebounce } from '@/lib/useDebounce';

const DashboardFood = dynamic(() => import('@/components/dashboard/food'), {
  suspense: true,
});
const CreateFood = dynamic(() => import('@/components/dashboard/createFood'), {
  suspense: true,
});
const Dialog = dynamic(() => import('@/components/dialog'), {
  suspense: true,
});

import type { ApiResponse } from '@/types/apiResponse';
import { type Session } from 'next-auth';
import { type FilterConfig } from '@/types/config';

export default function DashboardPage({
  session,
}: {
  session: Session | null;
}) {
  const { resolvedTheme } = useTheme();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
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

  if (!session || !session.user.isAdmin) {
    return (
      <div>
        <div className="m-10">Unauthorized</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="m-10">Failed to load</div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer
        transition={Zoom}
        autoClose={2500}
        newestOnTop={true}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />

      <div className="mb-2 flex flex-col sm:flex-row">
        <div className="mx-2 flex justify-between sm:block 2xl:mx-8">
          <Suspense>
            <CreateFood />
          </Suspense>
          <Suspense>
            <Dialog filter={filter} filterer={setFilter} />
          </Suspense>
        </div>

        <form className="mx-4 mb-2 mt-1 flex items-center sm:mx-0 sm:mt-0">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              id="simple-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
              placeholder="Search"
              required
            />
          </div>
        </form>
      </div>

      <Suspense>{data && <DashboardFood foodList={data.data} />}</Suspense>

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
