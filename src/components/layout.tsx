import type { ReactNode } from 'react';

import Navbar from '@/components/navbar';
import { type Session } from 'next-auth';

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
