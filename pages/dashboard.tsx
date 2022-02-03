import { useState } from 'react';

import { signIn, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

import type { GetStaticProps } from 'next';
import type { ApiResponse } from '@/types/apiResponse';

import prisma from '@/lib/prisma';
import fetcher from '@/lib/fetcher';
import { searchFood } from '@/lib/filter';

import Layout from '@/components/layout';

const DashboardFood = dynamic(() => import('@/components/dashboard/food'));
const CreateFood = dynamic(() => import('@/components/dashboard/createFood'));

export default function Dashboard({
  fallbackData,
}: {
  fallbackData: ApiResponse;
}) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('google');
    },
  });

  const [inputText, setInputText] = useState('');

  const { data, error } = useSWR<ApiResponse>('/api/food', fetcher, {
    fallbackData,
  });

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputText(e.target.value);
  }

  if (session && session.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
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
        <div className="m-10">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CreateFood></CreateFood>
      <input
        onChange={handleInput}
        type="text"
        placeholder="Search for food..."
        className="p-2 ml-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300"
      ></input>
      <DashboardFood
        foodList={
          inputText === '' ? data.data : searchFood(data.data, inputText)
        }
      ></DashboardFood>
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
    revalidate: 60,
  };
};
