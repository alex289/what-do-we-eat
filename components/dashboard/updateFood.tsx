import { FormEvent, useState } from 'react';

import axios from 'axios';
import { useSWRConfig } from 'swr';

import type { Food } from '@/types/food';
import { toast } from 'react-toastify';
import FormLayout from '@/components/form/formLayout';
import FormHeader from '@/components/form/formHeader';

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
      toast.error(
        `Failed updating '${e.target.name.value}': ${res.statusText}`
      );
      return;
    }

    setShowModal(false);
    toast.success(`Updated '${e.target.name.value}'`);
    mutate('/api/food');
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
          <FormLayout>
            <FormHeader title="Update food" exit={setShowModal} />
            <form
              className="relative flex-auto px-6"
              onSubmit={(e) =>
                saveFood(e as FormEvent<HTMLFormElement> & FormData)
              }
            >
              <div className="text-lg leading-relaxed">
                <label
                  className="block max-w-lg text-left"
                  htmlFor="update-name"
                >
                  <span className="text-gray-700 dark:text-gray-300">Name</span>
                </label>
                <input
                  type="text"
                  name="update-name"
                  id="name"
                  required
                  maxLength={30}
                  defaultValue={food.name}
                  placeholder="Enter name"
                  className="w-full p-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300"
                ></input>

                <label
                  className="block max-w-lg text-left"
                  htmlFor="update-image"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    Image
                  </span>
                </label>
                <input
                  type="text"
                  name="image"
                  id="update-image"
                  defaultValue={food.image}
                  placeholder="Enter image url"
                  className="w-full p-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300"
                ></input>

                <label
                  className="block max-w-lg mt-2 text-left"
                  htmlFor="update-cheeseometer"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    Cheeseometer
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
                  name="cheeseometer"
                  id="update-cheeseometer"
                  defaultValue={food.cheeseometer}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <label
                  className="block max-w-lg mt-2 text-left"
                  htmlFor="update-deliverable"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    Deliverable
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
                  name="deliverable"
                  id="update-deliverable"
                  defaultValue={food.deliverable ? 'true' : 'false'}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                <label
                  className="block max-w-lg mt-2 text-left"
                  htmlFor="update-nutrition"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    Nutrition
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
                  name="nutrition"
                  id="update-nutrition"
                  defaultValue={food.nutrition ?? ''}
                >
                  <option value=""></option>
                  <option value="Veggie">Veggie</option>
                  <option value="Vegan">Vegan</option>
                </select>

                <label
                  className="block max-w-lg mt-2 text-left"
                  htmlFor="update-effort"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    Effort
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
                  name="effort"
                  id="update-effort"
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
              </div>
              <button
                className="w-full p-2 px-5 mt-3 mb-4 text-lg text-gray-100 bg-green-600 rounded-lg hover:ring-4 ring-green-400"
                type="submit"
              >
                Update food
              </button>
            </form>
          </FormLayout>
          <div className="fixed inset-0 z-40 bg-gray-800 opacity-25"></div>
        </>
      )}
    </>
  );
};

export default UpdateFood;
