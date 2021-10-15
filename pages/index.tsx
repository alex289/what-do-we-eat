import { useState } from 'react';

import Layout from '@/components/layout';
import Food from '@/components/food';
import Random from '@/components/random';

export default function Index() {
  const [clicked, setClicked] = useState(false);
  const [btnTitle, setBtnTitle] = useState('Get random food');

  function handleClick(e: { preventDefault: () => void }) {
    e.preventDefault();
    clicked ? setClicked(false) : setClicked(true);
    clicked ? setBtnTitle('Get random food') : setBtnTitle('Get food list');
  }

  return (
    <Layout>
      <button
        className="p-2 px-5 m-3 mb-4 bg-purple-600 text-gray-100 text-lg rounded-lg hover:ring-4 ring-purple-400"
        onClick={handleClick}
      >
        {btnTitle}
      </button>
      {!clicked ? <Food></Food> : <Random></Random>}
    </Layout>
  );
}
