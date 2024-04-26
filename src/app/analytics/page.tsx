'use client';

import { type ApiResponse } from '@/types/apiResponse';
import { useMemo } from 'react';
import useSWR from 'swr';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import fetcher from '@/lib/fetcher';

import type { Analytics } from '@/server/db/types';

export default function AnalyticsPage() {
  const { data, error } = useSWR<ApiResponse<Analytics[]>, string>(
    '/api/analytics',
    fetcher,
  );

  const memoizedData = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    const uniqueAnalytics: Analytics[] = [];

    for (const currentAnalytics of data.data) {
      const existingAnalytics = uniqueAnalytics.find(
        (a) => a.name === currentAnalytics.name,
      );

      if (!existingAnalytics) {
        uniqueAnalytics.push(currentAnalytics);
      }
    }

    return (
      uniqueAnalytics.map((item) => {
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
    return <div>Failed to load</div>;
  }

  return (
    <div className="relative mx-auto max-w-5xl overflow-x-auto shadow-md sm:rounded-lg">
      <Table>
        <TableCaption>
          A list of picked foods choices by getting random food.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Food</TableHead>
            <TableHead>Picked</TableHead>
            <TableHead>Not picked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memoizedData.map((item) => {
            return (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.picked}</TableCell>
                <TableCell>{item.notPicked}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>
              {memoizedData.reduce((acc, item) => acc + item.picked, 0)}
            </TableCell>
            <TableCell>
              {memoizedData.reduce((acc, item) => acc + item.notPicked, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
