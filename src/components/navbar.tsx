'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import { ThemeToggle } from './theme-toggle';

const Navbar = () => {
  return (
    <nav className="top-0 z-50 mx-auto my-0 flex w-full items-center justify-between p-3 text-gray-900 dark:text-gray-100 md:my-4 md:p-0">
      <div>
        <h1 className="p-1 text-xl font-semibold text-gray-900 dark:text-gray-100 sm:ml-4 sm:p-4">
          <Link href="/">What do we eat?</Link>
        </h1>
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
