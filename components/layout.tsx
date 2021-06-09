import { ReactNode } from 'react';

import Container from '@material-ui/core/Container';

import Meta from '@/components/meta';
import Navbar from '@/components/Navbar';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Meta></Meta>
    <Navbar></Navbar>
    <Container maxWidth="md">
      <div>{children}</div>
    </Container>
  </>
);

export default Layout;
