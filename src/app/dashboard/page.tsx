import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

import DashboardPage from './page-ui';

export default function Dashboard() {
  const { sessionClaims } = auth();

  if (!sessionClaims?.admin) {
    return notFound();
  }

  return <DashboardPage />;
}
