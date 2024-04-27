import { currentUser } from '@clerk/nextjs/server';

import IndexPage from './page-ui';

export default async function Index() {
  const user = await currentUser();
  const emailAddresses = user?.emailAddresses.flatMap(
    (emailAddresses) => emailAddresses.emailAddress,
  );
  const isAdmin = user?.publicMetadata.admin === true;
  return <IndexPage emailAddresses={emailAddresses} isAdmin={isAdmin} />;
}
