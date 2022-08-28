import { FormEvent, useEffect, useRef } from 'react';

import { useSWRConfig } from 'swr';

import { toast } from 'react-toastify';
import type { food } from '@prisma/client';

type FormData = {
  target: {
    name: { value: string };
    image: { value: string };
    deliverable: { value: string };
    tags: { value: string };
    cheeseometer: { value: string };
    effort: { value: string };
  };
};

const UpdateFood = ({ food }: { food: food }) => {
  const { mutate } = useSWRConfig();
  const buttonRef = useRef<HTMLInputElement>(null);

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

    const data = await res.json();

    if (res.status !== 200) {
      toast.error(`Failed updating '${e.target.name.value}': ${data.message}`);
      return;
    }

    toast.success(`Updated '${e.target.name.value}'`);
    mutate('/api/food');
    if (buttonRef.current) {
      buttonRef.current.checked = false;
    }
  }

  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const deliverableRef = useRef<HTMLSelectElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const cheeseometerRef = useRef<HTMLSelectElement>(null);
  const effortRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.defaultValue = food.name;
    }
    if (imageRef.current) {
      imageRef.current.defaultValue = food.image;
    }
    if (deliverableRef.current) {
      deliverableRef.current.value = food.deliverable.toString();
    }
    if (tagsRef.current) {
      tagsRef.current.defaultValue = food.tags ?? '';
    }
    if (cheeseometerRef.current) {
      cheeseometerRef.current.value = food.cheeseometer.toString();
    }
    if (effortRef.current) {
      effortRef.current.value = food.effort.toString();
    }
  }, [food]);

  return (
    <>
      <label
        htmlFor={`update${food.name}Dialog`}
        className="modal-button btn mt-1 mr-2 border-none bg-orange-600 text-white ring-orange-400 hover:bg-orange-700 hover:ring-4">
        Update
      </label>
      <input
        type="checkbox"
        id={`update${food.name}Dialog`}
        ref={buttonRef}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative w-full max-w-xs bg-white dark:bg-gray-700">
          <label
            htmlFor={`update${food.name}Dialog`}
            className="btn btn-circle btn-sm absolute right-4 top-4 border-none bg-white hover:bg-white dark:bg-gray-700 hover:dark:bg-gray-700">
            ✕
          </label>
          <h3 className="text-lg font-bold text-black dark:text-white">
            Update food
          </h3>
          <form
            className="flex flex-col"
            onSubmit={(e) =>
              saveFood(e as FormEvent<HTMLFormElement> & FormData)
            }>
            <label className="mt-2 mb-1 mr-2 text-black dark:text-white">
              Name
            </label>
            <input
              type="text"
              name="name"
              ref={nameRef}
              required
              maxLength={30}
              placeholder="Enter name"
              className="input w-full max-w-xs bg-gray-200 text-black placeholder-black dark:bg-gray-600 dark:text-white dark:placeholder-white"></input>

            <label className="my-1 mr-2 text-black dark:text-white">
              Image (Optional)
            </label>
            <input
              type="text"
              name="image"
              ref={imageRef}
              placeholder="Enter image url"
              className="input w-full max-w-xs bg-gray-200 text-black placeholder-black dark:bg-gray-600 dark:text-white dark:placeholder-white"></input>

            <label className="my-1 mr-2 text-black dark:text-white">
              Cheeseometer
            </label>
            <select
              name="cheeseometer"
              className="select w-full max-w-xs bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
              ref={cheeseometerRef}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <label className="my-1 mr-2 text-black dark:text-white">
              Deliverable
            </label>
            <select
              name="deliverable"
              className="select w-full max-w-xs bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
              ref={deliverableRef}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <label className="my-1 mr-2 text-black dark:text-white">Tags</label>
            <input
              type="text"
              name="tags"
              ref={tagsRef}
              maxLength={30}
              placeholder="Enter name"
              className="input w-full max-w-xs bg-gray-200 text-black placeholder-black dark:bg-gray-600 dark:text-white dark:placeholder-white"></input>

            <label className="my-1 mr-2 text-black dark:text-white">
              Effort
            </label>
            <select
              name="effort"
              className="select w-full max-w-xs bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
              ref={effortRef}>
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
              className="btn mt-5 rounded-lg border-none bg-green-600 text-lg text-gray-100 ring-green-400 hover:bg-green-700 hover:ring-4"
              type="submit">
              Save food
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateFood;
