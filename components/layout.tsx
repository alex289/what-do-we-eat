import { ReactNode } from 'react';

import Meta from '@/components/meta';
import Navbar from '@/components/navbar';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Meta></Meta>
    <Navbar></Navbar>
    <div className="container mx-auto">{children}</div>
  </>
);

export default Layout;
