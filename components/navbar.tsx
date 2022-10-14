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
        {mounted && (
          <label
            className="swap swap-rotate mr-1 h-10 w-10 rounded-lg bg-gray-200 p-3 ring-gray-300 hover:ring-4 dark:bg-gray-700 md:mr-3"
            htmlFor="themeIcon">
            <input
              type="checkbox"
              id="themeIcon"
              checked={resolvedTheme === 'dark'}
              onChange={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
              }
            />

            <svg
              className="swap-on h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-off h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        )}

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
                {session.user.isAdmin && (
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
