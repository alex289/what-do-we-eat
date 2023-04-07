import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

import useSWR from 'swr';
import { signIn, useSession } from 'next-auth/react';
import { ToastContainer, Zoom } from 'react-toastify';
import { useTheme } from 'next-themes';

import { prisma } from '@/lib/prisma';
import fetcher from '@/lib/fetcher';
import { useDebounce } from '@/lib/useDebounce';

import Layout from '@/components/layout';

const DashboardFood = dynamic(() => import('@/components/dashboard/food'), {
  suspense: true,
});
const CreateFood = dynamic(() => import('@/components/dashboard/createFood'), {
  suspense: true,
});

import type { GetStaticProps, NextPage } from 'next';
import type { ApiResponse } from '@/types/apiResponse';

const Dashboard: NextPage<{
  fallbackData: ApiResponse;
}> = ({ fallbackData }) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('google');
    },
  });

  const { resolvedTheme } = useTheme();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data, error } = useSWR<ApiResponse>(
    `/api/food?${debouncedSearch !== '' && 'search=' + debouncedSearch}`,
    fetcher,
    {
      fallbackData,
    }
  );

  if (status === 'loading') {
    return <Layout>Loading or not authenticated...</Layout>;
  }

  if (session && !session.user.isAdmin) {
    return (
      <Layout>
        <div className="m-10">Unauthorized</div>
      </Layout>
    );
  }

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

      <div className="mb-2 flex">
        <Suspense>
          <CreateFood />
        </Suspense>

        <form className="mb-2 ml-2 flex items-center">
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
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const entries = await prisma.food.findMany();
  const fallbackData: ApiResponse = { status: 'Success', data: entries };

  return {
    props: {
      fallbackData,
    },
  };
};

export default Dashboard;
