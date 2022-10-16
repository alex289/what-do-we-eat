import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';

import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';

type Props = {
  user: {
    isAdmin: boolean;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};

export default function UserMenu({ user }: Props) {
  return (
    <div className="top-16 mr-4 w-fit rounded-full text-right">
      <Menu as="div" className="relative inline-block rounded-full text-left">
        <div>
          <Menu.Button className="inline-flex h-10 w-10 justify-center rounded-full px-4 py-2">
            {user.image && (
              <Image
                alt="profile picture"
                src={user.image}
                width={564}
                height={564}
                className="absolute inset-0 h-10 w-10 rounded-full"
              />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-50 text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:text-white dark:ring-gray-700">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'bg-violet-500 text-white'
                        : 'text-gray-900 dark:text-white'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                    {user.name}
                  </button>
                )}
              </Menu.Item>
              {user.isAdmin && (
                <Link href="/dashboard">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? 'bg-violet-500 text-white'
                            : 'text-gray-900 dark:text-white'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        Dashboard
                      </button>
                    )}
                  </Menu.Item>
                </Link>
              )}
            </div>
            <div className="px-1 py-1">
              <Link href="/analytics">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? 'bg-violet-500 text-white'
                          : 'text-gray-900 dark:text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                      Analytics
                    </button>
                  )}
                </Menu.Item>
              </Link>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active
                        ? 'bg-violet-500 text-white'
                        : 'text-gray-900 dark:text-white'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://github.com/alex289/what-do-we-eat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      active
                        ? 'bg-violet-500 text-white'
                        : 'text-gray-900 dark:text-white'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                    GitHub
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
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
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
