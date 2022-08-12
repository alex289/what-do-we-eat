import type { ReactNode } from 'react';

import Meta from '@/components/meta';
import Navbar from '@/components/navbar';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Meta></Meta>
    <Navbar></Navbar>
    <main className="container mx-auto mb-6">{children}</main>
  </>
);

export default Layout;
