import { useState } from 'react';

import axios from 'axios';
import { useSWRConfig } from 'swr';

import type { Food } from '@/types/food';
import { toast } from 'react-toastify';

const DeleteFood = ({ food }: { food: Food }) => {
  const [showModal, setShowModal] = useState(false);
  const { mutate } = useSWRConfig();

  async function deleteFood() {
    const res = await axios.delete('/api/food/delete/' + food.id);

    if (res.status !== 200) {
      toast.error(`Failed updating '${food.name}': ${res.statusText}`);
      return;
    }

    mutate('/api/food');
    setShowModal(false);
    toast.success(`Deleted '${food.name}'`);
  }

  return (
    <>
      <button
        className="p-3 mt-1 mr-2 text-gray-100 bg-red-600 rounded-lg ring-red-400 hover:ring-4"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              <div className="relative flex flex-col w-full border-0 rounded-lg shadow-lg outline-none bg-gray-50 focus:outline-none dark:bg-gray-700">
                <div className="flex items-start justify-between p-5 mx-16 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="mr-4 text-3xl font-semibold">Delete food</h3>
                  <button
                    className="float-right p-1 ml-4 text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block w-6 h-6 text-2xl text-black outline-none hover:text-gray-800 focus:outline-none dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto p-6">
                  <p className="text-lg leading-relaxed text-blueGray-500"></p>
                  Are you sure you want to delete {`'${food.name}'`}?
                </div>
                <button
                  className="p-2 px-5 m-3 mb-4 text-lg text-gray-100 bg-red-600 rounded-lg ring-red-400 hover:ring-4"
                  type="button"
                  onClick={() => deleteFood()}
                >
                  Delete {food.name}
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-gray-800 opacity-25"></div>
        </>
      )}
    </>
  );
};

export default DeleteFood;
