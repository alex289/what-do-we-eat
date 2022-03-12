import { FormEvent, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

import FormHeader from '@/components/form/formHeader';
import FormLayout from '@/components/form/formLayout';

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

const CreateFood = () => {
  const [showModal, setShowModal] = useState(false);

  const { mutate } = useSWRConfig();

  async function saveFood(e: FormEvent<HTMLFormElement> & FormData) {
    e.preventDefault();

    const res = await axios.post('/api/food/create', {
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
    toast.success(`Created '${e.target.name.value}'`);
    mutate('/api/food');
  }

  return (
    <>
      <button
        className="p-2 px-5 m-3 mb-4 text-lg text-white bg-green-600 rounded-lg hover:ring-4 ring-green-400"
        type="button"
        onClick={() => setShowModal(true)}>
        Add food
      </button>
      {showModal && (
        <>
          <FormLayout>
            <FormHeader title="Add food" exit={setShowModal} />
            <form
              className="relative flex-auto px-6"
              onSubmit={(e) =>
                saveFood(e as FormEvent<HTMLFormElement> & FormData)
              }>
              <div className="text-lg leading-relaxed">
                <label className="block max-w-lg mt-1 text-left" htmlFor="name">
                  <span className="text-gray-700 dark:text-gray-300">Name</span>
                </label>
                <input
                  type="text"
                  required
                  name="name"
                  id="name"
                  maxLength={30}
                  placeholder="Enter name"
                  className="w-full p-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300"></input>

                <label
                  className="block max-w-lg mt-2 text-left"
                  htmlFor="image">
                  <span className="text-gray-700 dark:text-gray-300">
                    Image (Optional)
                  </span>
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Enter image url"
                  className="w-full p-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300"></input>

                <label
                  className="block max-w-lg mt-2 text-left"
                  htmlFor="cheeseomenter">
                  <span className="text-gray-700 dark:text-gray-300">
                    Cheeseometer
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
                  name="cheeseometer"
                  id="cheeseometer">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <label
                  className="block max-w-lg mt-2 text-left"
                  htmlFor="deliverable">
                  <span className="text-gray-700 dark:text-gray-300">
                    Deliverable
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
                  name="deliverable"
                  id="deliverable">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                <label
                  className="block max-w-lg mt-2 text-left"
                  htmlFor="nutrition">
                  <span className="text-gray-700 dark:text-gray-300">
                    Nutrition
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
                  name="nutrition"
                  id="nutrition">
                  <option value="">-</option>
                  <option value="Veggie">Veggie</option>
                  <option value="Vegan">Vegan</option>
                </select>

                <label
                  className="block max-w-lg mt-2 text-left"
                  htmlFor="effort">
                  <span className="text-gray-700 dark:text-gray-300">
                    Effort
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
                  name="effort"
                  id="effort">
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
                className="w-full p-2 px-5 mt-3 mb-2 text-lg text-gray-100 bg-green-600 rounded-lg hover:ring-4 ring-green-400"
                type="submit">
                Save food
              </button>
            </form>
          </FormLayout>
          <div className="fixed inset-0 z-40 bg-gray-800 opacity-25"></div>
        </>
      )}
    </>
  );
};

export default CreateFood;
