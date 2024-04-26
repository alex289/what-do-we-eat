import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

import { Button } from '../ui/button';

import type { Food } from '@/server/db/types';
import type { FormEvent } from 'react';

const DeleteFood = ({ food }: { food: Food }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useSWRConfig();

  async function deleteFood(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch('/api/food/' + food.id, {
      method: 'DELETE',
    });

    if (res.status !== 200) {
      const data = (await res.json()) as { message: string };
      toast.error(`Failed updating '${food.name}': ${data.message}`);
      return;
    }

    toast.success(`Deleted '${food.name}'`);
    await mutate('/api/food');

    setIsOpen(false);
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Delete
      </Button>

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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                    className="mb-6 flex justify-between text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                    <div>Delete food</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      onClick={() => setIsOpen(false)}
                      className="h-6 w-6 cursor-pointer">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Dialog.Title>

                  <p>Are you sure you want to delete {`"${food.name}"`}?</p>

                  <form
                    className="mt-4 flex flex-col"
                    onSubmit={(e) => deleteFood(e)}>
                    <Button variant="destructive" type="submit">
                      Delete food
                    </Button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteFood;
