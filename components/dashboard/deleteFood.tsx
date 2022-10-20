import { FormEvent, Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { useSWRConfig } from 'swr';
import { toast } from 'react-toastify';

import type { food } from '@prisma/client';

const DeleteFood = ({ food }: { food: food }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useSWRConfig();

  async function deleteFood(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch('/api/food/delete/' + food.id, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (res.status !== 200) {
      toast.error(`Failed updating '${food.name}': ${data.message}`);
      return;
    }

    toast.success(`Deleted '${food.name}'`);
    mutate('/api/food');

    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mr-3 mb-2 w-full rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
        Delete
      </button>

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
                    className="flex flex-col"
                    onSubmit={(e) => deleteFood(e)}>
                    <button
                      className="btn mt-5 rounded-lg border-none bg-red-600 py-2 text-lg text-gray-100 ring-red-400 hover:bg-red-700 hover:ring-4"
                      type="submit">
                      Delete food
                    </button>
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
