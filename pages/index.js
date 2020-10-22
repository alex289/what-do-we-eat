import { useState } from 'react';

import Food from '../components/food';
import Random from '../components/random';
import Layout from '../components/layout';

export default function Index() {
  const [clicked, setClicked] = useState(false);
  const [btnTitle, setBtnTitle] = useState('Get random food');

  function handleClick(e) {
    e.preventDefault();
    clicked ? setClicked(false) : setClicked(true);
    clicked ? setBtnTitle('Get random food') : setBtnTitle('Get food list');
  }

  return (
    <Layout>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">What do we eat?</span>
      </nav>
      <br />
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={handleClick}>
        {btnTitle}
      </button>
      {!clicked ? <Food></Food> : <Random></Random>}
    </Layout>
  );
}
