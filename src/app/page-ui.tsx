'use client';

import { SignedIn } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';

import CreateFood from '@/components/admin/createFood';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import fetcher from '@/lib/fetcher';
import { handleFood } from '@/lib/filter';
import { useDebounce } from '@/lib/useDebounce';

import type { Favorite } from '@/server/db/types';
import type { ApiResponse, PaginatedApiResponse } from '@/types/apiResponse';
import type { ChangeEvent } from 'react';

const Food = dynamic(() => import('@/components/food'), {
  suspense: true,
});
const Dialog = dynamic(() => import('@/components/dialog'), {
  suspense: true,
});

export default function IndexPage({
  emailAddresses,
  isAdmin,
}: {
  emailAddresses: string[] | undefined;
  isAdmin: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = Number(searchParams.get('page') ?? 1);
  const amount = Number(searchParams.get('amount') ?? 40);
  const search = searchParams.get('search') ?? '';
  const randomize = !!searchParams.get('randomize');
  const sort = searchParams.get('sort') ?? '';
  const effort = searchParams.get('effort') ?? '';
  const deliverable = searchParams.get('deliverable') ?? '';
  const cheeseometer = searchParams.get('cheeseometer') ?? '';
  const tags = searchParams.get('tags') ?? '';

  const debouncedSearch = useDebounce(search, 500);

  const { data, error } = useSWR<PaginatedApiResponse, string>(
    `/api/food?page=${page}` +
      `${debouncedSearch !== '' ? '&search=' + debouncedSearch : ''}` +
      `${sort !== '' ? '&sort=' + sort : ''}` +
      `${amount !== 40 ? '&amount=' + amount : ''}` +
      `${effort !== '' ? '&effort=' + effort : ''}` +
      `${deliverable !== '' ? '&deliverable=' + deliverable : ''}` +
      `${cheeseometer !== '' ? '&cheeseometer=' + cheeseometer : ''}` +
      `${tags !== '' ? '&tags=' + tags : ''}`,
    fetcher,
  );
  const { data: favoriteData } = useSWR<ApiResponse<Favorite[]>>(
    '/api/food/favorite',
    fetcher,
  );

  const pagesCount = data ? Math.ceil(data.data.count / data.data.pageSize) : 0;
  const firstPages = pagesCount > 1 ? [1, 2] : [1];

  const middlePages = useMemo(() => {
    const pages: number[] = [];

    for (
      let i: number = Math.max(page - 2, 3);
      i <= Math.min(page + 2, pagesCount - 2) && i <= pagesCount - 2;
      i++
    ) {
      pages.push(i);
    }

    return pages;
  }, [page, pagesCount]);

  const lastPages = useMemo(() => {
    const pages: number[] = [];

    if (pagesCount > 2) {
      for (let i: number = Math.max(pagesCount - 1, 3); i <= pagesCount; i++) {
        pages.push(i);
      }
    }

    return pages;
  }, [pagesCount]);

  const showFirstToMiddleConnector =
    (firstPages[firstPages.length - 1] ?? -1) + 1 !== middlePages[0];
  const showMiddleToLastConnector =
    (middlePages[middlePages.length - 1] ?? -1) + 1 !== lastPages[0];

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('randomize', (!randomize).toString());
    const search = current.toString();
    const query = search ? `?${search}` : '';
    void router.push(`${pathname}${query}`);
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('search', e.target.value);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    void router.push(`${pathname}${query}`);
  }

  async function submitAnalytics(picked: boolean) {
    const res = await fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        name: memoizedFoodList[0]?.name,
        picked,
      }),
    });

    if (res.status !== 200) {
      const data = (await res.json()) as { message: string };

      toast.error(
        `Failed saving choice '${picked ? 'Good one' : 'Bad one'}': ${
          data.message
        }`,
      );
      return;
    }

    toast.success(`Submitted choice '${picked ? 'Good one' : 'Bad one'}'`);
  }

  const memoizedFoodList = useMemo(
    () => handleFood(data?.data.items ?? [], randomize),
    [data, randomize],
  );

  function goToPage(page: number) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set('page', page.toString());

    const search = current.toString();
    const query = search ? `?${search}` : '';
    void router.push(`${pathname}${query}`);
  }

  if (error) {
    return <div className="m-10">Failed to load</div>;
  }

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row">
        <div className="mx-2 flex justify-between sm:block 2xl:mx-8">
          <Button
            className="umami--click--random-food mx-3"
            onClick={handleClick}>
            {randomize ? 'Get food list' : 'Get random food'}
          </Button>
          <Suspense>
            <Dialog />
          </Suspense>
        </div>

        <Input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          className="mx-5 mt-2 sm:mt-0 w-auto sm:mx-0"
        />

        {isAdmin ? <CreateFood /> : null}
      </div>
      {randomize && (
        <SignedIn>
          <div className="mb-2 ml-3 flex gap-3 p-2 2xl:ml-7">
            <Button
              className="bg-green-600 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-800"
              onClick={() => submitAnalytics(true)}>
              Good choice
            </Button>

            <Button
              variant="destructive"
              onClick={() => submitAnalytics(false)}>
              Bad choice
            </Button>
          </div>
        </SignedIn>
      )}
      <Suspense>
        {data?.data && favoriteData?.data && (
          <Food
            foodList={memoizedFoodList}
            favorite={favoriteData?.data}
            emailAddresses={emailAddresses}
            isAdmin={isAdmin}
          />
        )}
      </Suspense>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(page - 1)}
              className={page === 1 ? 'pointer-events-none' : ''}
            />
          </PaginationItem>
          {firstPages.map((p) => (
            <PaginationItem key={p} className="hidden sm:block">
              <PaginationLink
                onClick={() => goToPage(p)}
                className={page === p ? 'pointer-events-none' : ''}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            hidden={showFirstToMiddleConnector}
            className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
          {middlePages.map((p) => (
            <PaginationItem key={p} className="hidden sm:block">
              <PaginationLink
                onClick={() => goToPage(p)}
                className={page === p ? 'pointer-events-none' : ''}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            hidden={showMiddleToLastConnector}
            className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
          {lastPages.map((p) => (
            <PaginationItem key={p} className="hidden sm:block">
              <PaginationLink
                onClick={() => goToPage(p)}
                className={page === p ? 'pointer-events-none' : ''}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(page + 1)}
              className={
                page === lastPages[lastPages.length - 1]
                  ? 'pointer-events-none'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex justify-center items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        Items {data ? (data.data.page - 1) * data.data.pageSize + 1 : 0} -{' '}
        {data
          ? Math.min(data.data.page * data.data.pageSize, data.data.count)
          : 0}{' '}
        of {data?.data.count}
      </div>
    </div>
  );
}
