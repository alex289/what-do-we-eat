import { useState } from 'react';
import dynamic from 'next/dynamic';

const Box = dynamic(() => import('@material-ui/core/Box'));
const Button = dynamic(() => import('@material-ui/core/Button'));
const SvgIcon = dynamic(() => import('@material-ui/core/SvgIcon'));
const Shuffle = dynamic(() => import('@material-ui/icons/Shuffle'));

const Food = dynamic(() => import('@/components/food'));
const Random = dynamic(() => import('@/components/random'));
const Layout = dynamic(() => import('@/components/layout'));

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
          <div className="btnText">{btnTitle}</div>
        </Button>
      </Box>
      {!clicked ? <Food></Food> : <Random></Random>}
      <style global jsx>{`
        @media only screen and (max-width: 768px) {
          .MuiCard-root {
            height: 250px;
          }
        }
        .btnText {
          margin-left: 10px;
        }
      `}</style>
    </Layout>
  );
}
