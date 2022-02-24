import { FormEvent, useState } from 'react';

import axios from 'axios';
import { useSWRConfig } from 'swr';

import type { Food } from '@/types/food';
import { toast } from 'react-toastify';

type FormData = {
  target: {
    name: { value: string };
    image: { value: string };
    deliverable: { value: string };
    nutrition: { value: string };
    cheeseometer: { value: string };
    effort: { value: string };
  };
};

const UpdateFood = ({ food }: { food: Food }) => {
  const [showModal, setShowModal] = useState(false);
  const { mutate } = useSWRConfig();

  async function saveFood(e: FormEvent<HTMLFormElement> & FormData) {
    e.preventDefault();

    const res = await axios.put('/api/food/update/' + food.id, {
      name: e.target.name.value,
      image: e.target.image.value,
      deliverable: e.target.deliverable.value === 'true' ? true : false,
      nutrition: e.target.nutrition.value,
      cheeseometer: Number(e.target.cheeseometer.value),
      effort: Number(e.target.effort.value),
    });

    if (res.status !== 200) {
      toast.error(`Failed updating '${name}': ${res.statusText}`);
      return;
    }

    mutate('/api/food');
    setShowModal(false);
    toast.success(`Updated '${name}'`);
  }

  return (
    <>
      <button
        className="p-3 mt-1 mr-2 text-gray-100 bg-orange-600 rounded-lg hover:ring-4 ring-orange-400"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Update
      </button>
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full border-0 rounded-lg shadow-lg outline-none bg-gray-50 dark:bg-gray-700 focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 mx-16 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="mr-4 text-3xl font-semibold">Update food</h3>
                  <button
                    className="float-right p-1 ml-4 text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block w-6 h-6 text-2xl text-black outline-none dark:text-white hover:text-gray-800 focus:outline-none">
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
                {/*body*/}
                <form
                  className="relative flex-auto px-6"
                  onSubmit={(e) =>
                    saveFood(e as FormEvent<HTMLFormElement> & FormData)
                  }
                >
                  <p className="text-lg leading-relaxed text-blueGray-500">
                    <label className="block max-w-lg text-left">
                      <span className="text-gray-700 dark:text-gray-300">
                        Name
                      </span>
                      <br />
                      <input
                        type="text"
                        name="name"
                        required
                        maxLength={30}
                        defaultValue={food.name}
                        placeholder="Enter name"
                        className="w-full p-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300"
                      ></input>
                    </label>
                    <label className="block max-w-lg text-left">
                      <span className="text-gray-700 dark:text-gray-300">
                        Image
                      </span>
                      <br />
                      <input
                        type="text"
                        name="image"
                        defaultValue={food.image}
                        placeholder="Enter image url"
                        className="w-full p-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300"
                      ></input>
                    </label>
                    <label className="block max-w-lg mt-2 text-left">
                      <span className="text-gray-700 dark:text-gray-300">
                        Cheeseometer
                      </span>
                      <select
                        className="block w-full mt-1 form-select"
                        name="cheeseometer"
                        defaultValue={food.cheeseometer}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </label>
                    <label className="block max-w-lg mt-2 text-left">
                      <span className="text-gray-700 dark:text-gray-300">
                        Deliverable
                      </span>
                      <select
                        className="block w-full mt-1 form-select"
                        name="deliverable"
                        defaultValue={food.deliverable ? 'true' : 'false'}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </label>
                    <label className="block max-w-lg mt-2 text-left">
                      <span className="text-gray-700 dark:text-gray-300">
                        Nutrition
                      </span>
                      <select
                        className="block w-full mt-1 form-select"
                        name="nutrition"
                        defaultValue={food.nutrition ?? ''}
                      >
                        <option value=""></option>
                        <option value="Veggie">Veggie</option>
                        <option value="Vegan">Vegan</option>
                      </select>
                    </label>
                    <label className="block max-w-lg mt-2 text-left">
                      <span className="text-gray-700 dark:text-gray-300">
                        Effort
                      </span>
                      <select
                        className="block w-full mt-1 form-select"
                        name="effort"
                        defaultValue={food.effort}
                      >
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
                    </label>
                  </p>
                  <button
                    className="w-full p-2 px-5 mt-3 mb-4 text-lg text-gray-100 bg-green-600 rounded-lg hover:ring-4 ring-green-400"
                    type="submit"
                  >
                    Update food
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateFood;
