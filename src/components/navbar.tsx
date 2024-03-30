'use client';

import { type Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';

const UserMenu = dynamic(() => import('@/components/UserMenu'));

const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="top-0 z-50 mx-auto my-0 flex w-full items-center justify-between p-3 text-gray-900 dark:text-gray-100 md:my-4 md:p-0">
      <div>
        <h1 className="p-1 text-xl font-semibold text-gray-900 dark:text-gray-100 sm:ml-4 sm:p-4">
          <Link href="/">What do we eat?</Link>
        </h1>
      </div>
      <div className="flex gap-4">
        <ThemeToggle />

        <SessionToggle session={session} />
      </div>
    </nav>
  );
};

function SessionToggle({ session }: { session: Session | null }) {
  if (!session) {
    return (
      <div className="sm:mr-4">
        <Button onClick={() => signIn('google')}>Login</Button>
      </div>
    );
  }

  return <UserMenu user={session.user} />;
}

export default Navbar;
