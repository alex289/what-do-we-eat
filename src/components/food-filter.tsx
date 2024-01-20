'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { type ChangeEvent, useCallback } from 'react';

export function FoodFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function setRandom() {
    const isRandom = searchParams.get('random') === 'true';
    router.push(
      pathname + '?' + createQueryString('random', isRandom ? 'false' : 'true'),
    );
  }

  function updateSearch(event: ChangeEvent<HTMLInputElement>) {
    router.push(
      pathname + '?' + createQueryString('search', event.target.value),
    );
  }

  return (
    <div className="mb-4 ml-4 flex items-center gap-4">
      <Button className="px-4 py-2" onClick={() => setRandom()}>
        Random Food
      </Button>
      <Button className="px-4 py-2">Filter Dialog</Button>
      <Input
        placeholder="Search food..."
        className="w-fit dark:bg-gray-900"
        defaultValue={searchParams.get('search') ?? ''}
        onChange={updateSearch}
      />
    </div>
  );
}
