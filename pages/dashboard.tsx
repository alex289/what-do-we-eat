import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

import useSWR from 'swr';
import { signIn, useSession } from 'next-auth/react';
import { ToastContainer, Zoom } from 'react-toastify';
import { useTheme } from 'next-themes';

import { prisma } from '@/lib/prisma';
import fetcher from '@/lib/fetcher';
import { searchFood } from '@/lib/filter';

import Layout from '@/components/layout';

const DashboardFood = dynamic(() => import('@/components/dashboard/food'));
const CreateFood = dynamic(() => import('@/components/dashboard/createFood'));

import type { GetStaticProps } from 'next';
import type { ApiResponse } from '@/types/apiResponse';

export default function Dashboard({
  fallbackData,
}: {
  fallbackData: ApiResponse;
}) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('google');
    },
  });

  const { resolvedTheme } = useTheme();
  const [inputText, setInputText] = useState('');

  const { data, error } = useSWR<ApiResponse>('/api/food', fetcher, {
    fallbackData,
  });

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputText(e.target.value);
  }

  if (status === 'loading') {
    return <Layout>Loading or not authenticated...</Layout>;
  }

  if (session && !session.isAdmin) {
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
  if (!data) {
    return (
      <Layout>
        <progress className="progress progress-primary w-full"></progress>
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
      <CreateFood></CreateFood>
      <input
        onChange={handleInput}
        type="text"
        placeholder="Search for food..."
        className="input input-bordered input-primary ml-3 bg-white text-black placeholder-black dark:bg-gray-800 dark:text-white dark:placeholder-white"></input>
      <Suspense
        fallback={
          <progress className="progress progress-primary w-full"></progress>
        }>
        <DashboardFood
          foodList={
            inputText === '' ? data.data : searchFood(data.data, inputText)
          }></DashboardFood>
      </Suspense>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const entries = await prisma.food.findMany();
  const fallbackData: ApiResponse = { status: 'Success', data: entries };

  return {
    props: {
      fallbackData,
    },
  };
};
