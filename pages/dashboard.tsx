import { useState } from 'react';

import useSWR from 'swr';

import { ApiResponse } from '@/types/apiResponse';
import fetcher from '@/lib/fetcher';

import Layout from '@/components/layout';
import DashboardFood from '@/components/dashboard/food';
import DashboardSearch from '@/components/dashboard/search';
import CreateFood from '@/components/dashboard/createFood';

export default function Index() {
  const [inputText, setInputText] = useState('');

  const { data, error } = useSWR<ApiResponse>('/api/food', fetcher);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputText(e.target.value);
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
        className="p-2 ml-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-900 dark:text-gray-300"
      ></input>
      {inputText === '' ? (
        <DashboardFood foodList={data.data}></DashboardFood>
      ) : (
        ''
      )}
      {inputText !== '' ? (
        <DashboardSearch
          input={inputText}
          foodList={data.data}
        ></DashboardSearch>
      ) : (
        ''
      )}
    </Layout>
  );
}
