import { Suspense, useMemo, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useSWR from 'swr';
import { prisma } from '@/lib/prisma';

import fetcher from '@/lib/fetcher';

import Layout from '@/components/layout';

import type { GetStaticProps } from 'next';
import type { analytics } from '@prisma/client';
import type { ApiResponse } from '@/types/apiResponse';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Analytics for picked random food',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function AnalyticsPage({
  fallbackData,
}: {
  fallbackData: ApiResponse<analytics[]>;
}) {
  const [colors] = useState([getRandomColor(), getRandomColor()]);
  const { data, error } = useSWR<ApiResponse<analytics[]>>(
    '/api/analytics',
    fetcher,
    { fallbackData }
  );

  const memoizedData = useMemo(() => {
    const labels = data?.data
      .filter((v, i, a) => a.map((item) => item.name).indexOf(v.name) === i)
      .map((item) => item.name);

    return {
      labels,
      datasets: [
        {
          label: 'Picked',
          data: labels?.map(
            (label) =>
              data?.data.filter((item) => item.name === label && item.picked)
                .length
          ),
          backgroundColor: colors[0],
          stack: 'Stack 0',
        },
        {
          label: 'Not picked',
          data: labels?.map(
            (label) =>
              data?.data.filter((item) => item.name === label && !item.picked)
                .length
          ),
          backgroundColor: colors[1],
          stack: 'Stack 1',
        },
      ],
    };
  }, [colors, data?.data]);

  if (error) {
    return <Layout>Failed to load</Layout>;
  }

  if (!data) {
    return <Layout>Loading</Layout>;
  }

  return (
    <Layout>
      <Suspense>
        <div className="chart-container relative h-screen max-h-[35em] w-full px-8">
          <Bar options={options} data={memoizedData} />
        </div>
      </Suspense>
    </Layout>
  );
}

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
    revalidate: 60,
  };
};
