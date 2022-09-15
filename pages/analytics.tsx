import { Suspense, useMemo } from 'react';

import useSWR from 'swr';
import { prisma } from '@/lib/prisma';

import fetcher from '@/lib/fetcher';

import Layout from '@/components/layout';

import type { GetStaticProps, NextPage } from 'next';
import type { analytics } from '@prisma/client';
import type { ApiResponse } from '@/types/apiResponse';

const AnalyticsPage: NextPage<{
  fallbackData: ApiResponse<analytics[]>;
}> = ({ fallbackData }) => {
  const { data, error } = useSWR<ApiResponse<analytics[]>>(
    '/api/analytics',
    fetcher,
    { fallbackData }
  );

  const memoizedData = useMemo(() => {
    return (
      data?.data.map((item) => {
        return {
          name: item.name,
          picked: data.data.filter((v) => v.name === item.name && v.picked)
            .length,
          notPicked: data.data.filter((v) => v.name === item.name && !v.picked)
            .length,
        };
      }) ?? []
    );
  }, [data?.data]);

  if (error) {
    return <Layout>Failed to load</Layout>;
  }

  return (
    <Layout>
      <Suspense>
        <div className="mx-auto max-w-4xl overflow-x-auto px-4">
          <table className="mx-auto min-w-full table-auto border-collapse border border-gray-200 bg-gray-100 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700">
                <th className="py-4 px-6 text-left font-medium">Food</th>
                <th className="py-4 px-6 text-left font-medium">Picked</th>
                <th className="py-4 px-6 text-left font-medium">Not Picked</th>
              </tr>
            </thead>
            <tbody>
              {memoizedData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-200 dark:border-gray-700 hover:dark:bg-gray-700">
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6">{item.picked}</td>
                    <td className="py-4 px-6">{item.notPicked}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Suspense>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const entries = await prisma.analytics.findMany();
  const fallbackData: ApiResponse<analytics[]> = {
    status: 'Success',
    data: entries,
  };

  return {
    props: {
      fallbackData,
    },
  };
};

export default AnalyticsPage;
