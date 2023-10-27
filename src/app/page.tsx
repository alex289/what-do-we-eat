import { getServerAuthSession } from '@/lib/auth';
import IndexPage from './page-ui';

export default async function Index() {
  const session = await getServerAuthSession();
  return <IndexPage session={session} />;
}
