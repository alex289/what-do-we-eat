import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

import { ThemeToggle } from './theme-toggle';

const Navbar = async () => {
  const activeUser = await currentUser();
  const isAdmin = activeUser?.publicMetadata.admin;
  return (
    <nav className="top-0 z-50 mx-auto my-0 flex w-full items-center justify-between p-3 text-gray-900 dark:text-gray-100 md:mb-4 md:p-0">
      <div className="flex p-1 sm:p-4 items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          <Link href="/">What do we eat?</Link>
        </h1>

        <SignedIn>
          {isAdmin ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/analytics">Analytics</Link>
            </>
          ) : null}
        </SignedIn>
      </div>
      <div className="flex flex-row items-center gap-4 mr-4">
        <ThemeToggle />
        <SessionToggle />
      </div>
    </nav>
  );
};

function SessionToggle() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}

export default Navbar;
