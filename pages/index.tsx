import { useState } from 'react';

import dynamic from 'next/dynamic';
import useSWR from 'swr';

import type { GetStaticProps } from 'next';
import type { FilterConfig, FoodConfig } from '@/types/config';
import type { ApiResponse } from '@/types/apiResponse';

import prisma from '@/lib/prisma';
import fetcher from '@/lib/fetcher';
import { handleFood } from '@/lib/filter';

import Layout from '@/components/layout';

const Food = dynamic(() => import('@/components/food'));
const Dialog = dynamic(() => import('@/components/dialog'));

export default function Index({ fallbackData }: { fallbackData: ApiResponse }) {
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
    nutrition: '',
  });

  const { data, error } = useSWR<ApiResponse>('/api/food', fetcher, {
    fallbackData,
  });

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    setClicked(clicked ? false : true);
    setBtnTitle(clicked ? 'Get food list' : 'Get random food');

    setFoodConfig({
      filter: foodConfig.filter,
      random: clicked,
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
      <button
        className="p-2 px-5 m-3 mb-4 text-lg text-gray-100 bg-purple-600 rounded-lg hover:ring-4 ring-purple-400"
        onClick={handleClick}>
        {btnTitle}
      </button>
      <Dialog
        filterer={setFilter}
        config={foodConfig}
        setConfig={setFoodConfig}></Dialog>
      <input
        onChange={handleInput}
        type="text"
        placeholder="Search for food..."
        className="p-2 ml-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300"></input>
      <Food foodList={handleFood(data.data, foodConfig, filter)}></Food>
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
