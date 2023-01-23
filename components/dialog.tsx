import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import Button from '@/components/core/Button';
import type { FilterConfig } from '@/types/config';

type Props = {
  filter: FilterConfig;
  filterer: (filter: FilterConfig) => void;
};

export default function FilterDialog({ filter, filterer }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target = event.target as any;

    filterer({
      sort: target.sort.value.replace('-', ''),
      amount: Number(target.amount.value),
      effort: target.effort.value.replace('-', ''),
      deliverable: target.deliverable.value.replace('-', ''),
      cheeseometer: target.cheeseometer.value.replace('-', ''),
      tags: target.tags.value.replace('-', ''),
    });

    setIsOpen(false);
  }

  function clearFilter() {
    filterer({
      sort: '',
      amount: 40,
      effort: '',
      deliverable: '',
      cheeseometer: '',
      tags: '',
    });

    setIsOpen(false);
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Filter food</Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <form
              onSubmit={submit}
              className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-700">
                  <Dialog.Title
                    as="h3"
                    className="mb-6 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Filter food
                  </Dialog.Title>
                  <label
                    htmlFor="sort"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
                    Sort
                  </label>
                  <select
                    id="sort"
                    defaultValue={filter.sort}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500">
                    <option value="">-</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>

                  <label
                    htmlFor="amount"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
                    Amount
                  </label>
                  <input
                    id="amount"
                    type="number"
                    min={1}
                    max={100}
                    defaultValue={filter.amount}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"></input>

                  <label
                    htmlFor="cheeseometer"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
                    Cheesometer
                  </label>
                  <select
                    id="cheeseometer"
                    defaultValue={filter.cheeseometer}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500">
                    <option value="-">-</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>

                  <label
                    htmlFor="deliverable"
                    className="mb-2 mt-1 block text-sm font-medium text-gray-900 dark:text-gray-400">
                    Deliverable
                  </label>
                  <select
                    id="deliverable"
                    defaultValue={filter.deliverable}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500">
                    <option value="-">-</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>

                  <label
                    htmlFor="tags"
                    className="mb-2 mt-1 block text-sm font-medium text-gray-900 dark:text-gray-400">
                    Tags
                  </label>
                  <select
                    id="tags"
                    defaultValue={filter.tags}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500">
                    <option value="-">-</option>
                    <option value="Veggie">Veggie</option>
                    <option value="Vegan">Vegan</option>
                  </select>

                  <label
                    htmlFor="effort"
                    className="mb-2 mt-1 block text-sm font-medium text-gray-900 dark:text-gray-400">
                    Effort
                  </label>
                  <select
                    id="effort"
                    defaultValue={filter.effort}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500">
                    <option value="-">-</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="mr-2 mb-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                      Apply filter
                    </button>
                    <button
                      onClick={clearFilter}
                      type="button"
                      className="mr-2 mb-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700">
                      Clear filter
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </form>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
