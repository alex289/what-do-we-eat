import { ReactNode } from 'react';

import Container from '@material-ui/core/Container';

import Meta from '@/components/meta';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Meta></Meta>
    <Container maxWidth="md">
      <div>{children}</div>
    </Container>
  </>
);

export default Layout;
