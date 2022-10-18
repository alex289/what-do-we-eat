import Link from 'next/link';

import Layout from '@/components/layout';

import type { NextPage } from 'next';

const NotFound: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center px-8">
        <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
            404 – Page not found
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Why show a generic 404 when I can make it sound mysterious? It seems
            you&apos;ve found something that used to exist, or you spelled
            something wrong. I&apos;m guessing you spelled something wrong. Can
            you double check that URL?
          </p>
          <Link href="/">
            <div className="btn mx-auto w-64 rounded-md border-none bg-gray-200 p-1 py-3 text-center font-bold text-black hover:bg-[#c9c9c9] dark:bg-gray-700 dark:text-white hover:dark:bg-gray-600 sm:p-4">
              Return home
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
