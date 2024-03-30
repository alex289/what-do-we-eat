import { type FormEvent, Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { useSWRConfig } from 'swr';
import { toast } from 'react-toastify';

import type { food } from '@prisma/client';
import { Button } from '../ui/button';

interface FormData {
  target: {
    name: { value: string };
    image: { value: string };
    deliverable: { value: string };
    tags: { value: string };
    cheeseometer: { value: string };
    effort: { value: string };
  };
}

const UpdateFood = ({ food }: { food: food }) => {
  const { mutate } = useSWRConfig();
  const [isOpen, setIsOpen] = useState(false);

  async function saveFood(e: FormEvent<HTMLFormElement> & FormData) {
    e.preventDefault();

    const res = await fetch('/api/food/update/' + food.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: e.target.name.value,
        image: e.target.image.value,
        deliverable: e.target.deliverable.value === 'true' ? true : false,
        tags: e.target.tags.value,
        cheeseometer: Number(e.target.cheeseometer.value),
        effort: Number(e.target.effort.value),
      }),
    });

    const data = (await res.json()) as { message: string };

    if (res.status !== 200) {
      toast.error(`Failed updating '${e.target.name.value}': ${data.message}`);
      return;
    }

    toast.success(`Updated '${e.target.name.value}'`);
    await mutate('/api/food');

    setIsOpen(false);
  }

  return (
    <>
      <Button
        className="bg-orange-600 hover:bg-orange-500 dark:bg-orange-700 dark:hover:bg-orange-800"
        onClick={() => setIsOpen(true)}>
        Update
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
                    <div>Update food</div>
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

                  <form
                    className="flex flex-col"
                    onSubmit={(e) =>
                      saveFood(e as FormEvent<HTMLFormElement> & FormData)
                    }>
                    <label
                      className="mb-1 mr-2 mt-2 text-black dark:text-white"
                      htmlFor="updateName">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      id="updateName"
                      maxLength={30}
                      placeholder="Enter name"
                      defaultValue={food.name}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"></input>

                    <label
                      className="my-1 mr-2 text-black dark:text-white"
                      htmlFor="updateImage">
                      Image (Optional)
                    </label>
                    <input
                      type="text"
                      name="image"
                      id="updateImage"
                      placeholder="Enter image url"
                      defaultValue={food.image}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"></input>

                    <label
                      className="my-1 mr-2 text-black dark:text-white"
                      htmlFor="updateCheeseomenter">
                      Cheeseometer
                    </label>
                    <select
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
                      name="cheeseometer"
                      id="updateCheeseomenter"
                      defaultValue={food.cheeseometer}>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>

                    <label
                      className="my-1 mr-2 text-black dark:text-white"
                      htmlFor="updateDeliverable">
                      Deliverable
                    </label>
                    <select
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
                      name="deliverable"
                      id="updateDeliverable"
                      defaultValue={food.deliverable ? 'true' : 'false'}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>

                    <label
                      className="my-1 mr-2 text-black dark:text-white"
                      htmlFor="updateTags">
                      Tags
                    </label>
                    <select
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
                      name="tags"
                      id="updateTags"
                      defaultValue={food.tags ?? ''}>
                      <option value="">-</option>
                      <option value="Veggie">Veggie</option>
                      <option value="Vegan">Vegan</option>
                    </select>

                    <label
                      className="my-1 mr-2 text-black dark:text-white"
                      htmlFor="updateEffort">
                      Effort
                    </label>
                    <select
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
                      name="effort"
                      id="updateEffort"
                      defaultValue={food.effort}>
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
                    <button
                      className="btn mt-5 rounded-lg border-none bg-orange-600 py-2 text-lg text-gray-100 ring-orange-400 hover:bg-orange-700 hover:ring-4"
                      type="submit">
                      Save food
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

export default UpdateFood;
