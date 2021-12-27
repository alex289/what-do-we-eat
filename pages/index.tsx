import { useState } from 'react';

import useSWR from 'swr';

import { ApiResponse } from '@/types/apiResponse';
import fetcher from '@/lib/fetcher';

import Layout from '@/components/layout';
import Food from '@/components/food';
import Random from '@/components/random';
import Search from '@/components/search';
import Dialog from '@/components/dialog';
import Filter from '@/components/filter';

export default function Index() {
  const [clicked, setClicked] = useState(false);
  const [btnTitle, setBtnTitle] = useState('Get random food');
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState({
    effort: '',
    size: '',
    deliverable: '',
  });

  const { data, error } = useSWR<ApiResponse>('/api/food', fetcher);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    clicked ? setClicked(false) : setClicked(true);
    clicked ? setBtnTitle('Get random food') : setBtnTitle('Get food list');
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputText(e.target.value);
  }

  if (error) {
    return <div className="m-10">Failed to load</div>;
  }
  if (!data) {
    return <div className="m-10">Loading...</div>;
  }

  return (
    <Layout>
      <button
        className="p-2 px-5 m-3 mb-4 text-lg text-gray-100 bg-purple-600 rounded-lg hover:ring-4 ring-purple-400"
        onClick={handleClick}
      >
        {btnTitle}
      </button>
      <Dialog filterer={setFilter}></Dialog>
      <input
        onChange={handleInput}
        type="text"
        placeholder="Search for food..."
        className="p-2 ml-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-900 dark:text-gray-300"
      ></input>
      {!clicked && inputText === '' && filter.effort === '' ? (
        <Food foodList={data.data}></Food>
      ) : (
        ''
      )}
      {!clicked && inputText === '' && filter.effort !== '' ? (
        <Filter
          size={filter.size}
          effort={filter.effort}
          deliverable={filter.deliverable}
          foodList={data.data}
        ></Filter>
      ) : (
        ''
      )}
      {clicked && inputText === '' ? (
        <Random foodList={data.data}></Random>
      ) : (
        ''
      )}
      {inputText !== '' ? (
        <Search input={inputText} foodList={data.data}></Search>
      ) : (
        ''
      )}
    </Layout>
  );
}
