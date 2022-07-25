import Link from 'next/link';
import Image from 'next/future/image';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="navbar bg-gray-50 text-gray-900 dark:bg-gray-800 dark:text-gray-100 md:my-4">
      <div className="flex-1">
        <h1 className="btn btn-ghost text-xl normal-case text-gray-900 dark:text-gray-100 sm:ml-4">
          <Link href="/">What do we eat?</Link>
        </h1>
      </div>
      <div className="flex-none">
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="mr-1 h-10 w-10 rounded-lg bg-gray-200 p-3 ring-gray-300 hover:ring-4 dark:bg-gray-700 md:mr-3"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="h-4 w-4 text-gray-800 dark:text-gray-200">
              {resolvedTheme === 'dark' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          )}
        </button>

        {!session?.user && (
          <button
            className="btn btn-primary ml-1 normal-case"
            onClick={() => signIn('google')}>
            Sign in
          </button>
        )}

        {session?.user && (
          <div className="dropdown dropdown-end ml-1 sm:mr-4">
            <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
              <div className="w-10">
                {session.user.image && (
                  <Image
                    alt="profile picture"
                    src={session.user.image}
                    width={564}
                    height={564}
                    className="absolute inset-0 h-10 w-10 rounded-full"
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-white p-2 shadow dark:bg-gray-700">
              <li>
                <div className="justify-between">{session.user.name}</div>
              </li>
              <>
                {session.isAdmin && (
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                )}
              </>
              <li>
                <Link href="/analytics">Analytics</Link>
              </li>
              <li>
                <div onClick={() => signOut()}>Logout</div>
              </li>
              <li>
                <a
                  href="https://github.com/alex289/what-do-we-eat"
                  target="_blank"
                  rel="noopener noreferrer">
                  GitHub
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-[-0.5em] h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
