import { type Session } from 'next-auth';

import Navbar from '@/components/navbar';

import type { ReactNode } from 'react';

const Layout = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => (
  <>
    <Navbar session={session}></Navbar>
    <main className="mb-6">{children}</main>
  </>
);

export default Layout;
