import { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Shuffle from '@material-ui/icons/Shuffle';

import Food from '@/components/food';
import Random from '@/components/random';
import Layout from '@/components/layout';

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
      <Box m={2}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          <SvgIcon>
            <Shuffle></Shuffle>
          </SvgIcon>
          {btnTitle}
        </Button>
      </Box>
      {!clicked ? <Food></Food> : <Random></Random>}
      <style global jsx>{`
        @media only screen and (max-width: 768px) {
          .MuiCard-root {
            height: 250px;
          }
        }
      `}</style>
    </Layout>
  );
}
