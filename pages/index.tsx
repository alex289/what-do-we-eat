import { useState } from 'react';

import Layout from '@/components/layout';
import Food from '@/components/food';
import Random from '@/components/random';
import Search from '@/components/search';

export default function Index() {
  const [clicked, setClicked] = useState(false);
  const [btnTitle, setBtnTitle] = useState('Get random food');
  const [inputText, setInputText] = useState('');

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    clicked ? setClicked(false) : setClicked(true);
    clicked ? setBtnTitle('Get random food') : setBtnTitle('Get food list');
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputText(e.target.value);
  }

  return (
    <Layout>
      <button
        className="p-2 px-5 m-3 mb-4 bg-purple-600 text-gray-100 text-lg rounded-lg hover:ring-4 ring-purple-400"
        onClick={handleClick}
      >
        {btnTitle}
      </button>
      <input
        onChange={handleInput}
        type="text"
        placeholder="Search for food..."
        className="ml-4 p-2 shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline text-gray-700 dark:bg-black dark:text-gray-300"
      ></input>
      {!clicked && inputText === '' ? <Food></Food> : ''}
      {clicked && inputText === '' ? <Random></Random> : ''}
      {inputText !== '' ? <Search input={inputText}></Search> : ''}
    </Layout>
  );
}
