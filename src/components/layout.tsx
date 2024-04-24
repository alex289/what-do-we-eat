import Navbar from '@/components/navbar';

import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Navbar></Navbar>
    <main className="mb-6">{children}</main>
  </>
);

export default Layout;
