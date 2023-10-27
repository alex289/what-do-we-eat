import { getServerAuthSession } from '@/lib/auth';
import DashboardPage from './page-ui';

export default async function Dashboard() {
  const session = await getServerAuthSession();
  return <DashboardPage session={session} />;
}
