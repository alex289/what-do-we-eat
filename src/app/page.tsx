import { currentUser } from '@clerk/nextjs/server';

import IndexPage from './page-ui';

export default async function Index() {
  const user = await currentUser();
  const emailAddresses = user?.emailAddresses.flatMap(
    (emailAddresses) => emailAddresses.emailAddress,
  );
  return <IndexPage emailAddresses={emailAddresses} />;
}
