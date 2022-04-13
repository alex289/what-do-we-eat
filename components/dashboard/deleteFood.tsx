import axios from 'axios';
import { useSWRConfig } from 'swr';

import type { Food } from '@/types/food';
import { toast } from 'react-toastify';

const DeleteFood = ({ food }: { food: Food }) => {
  const { mutate } = useSWRConfig();

  async function deleteFood() {
    const res = await axios.delete('/api/food/delete/' + food.id);

    if (res.status !== 200) {
      toast.error(`Failed updating '${food.name}': ${res.statusText}`);
      return;
    }

    toast.success(`Deleted '${food.name}'`);
    mutate('/api/food');
  }

  return (
    <>
      <label
        htmlFor="deleteDialog"
        className="mt-1 mr-2 text-white bg-red-600 border-none btn hover:bg-red-700 modal-button ring-red-400 hover:ring-4">
        Delete
      </label>
      <input type="checkbox" id="deleteDialog" className="modal-toggle" />
      <div className="modal">
        <div className="relative w-auto bg-white modal-box dark:bg-gray-700">
          <label
            htmlFor="deleteDialog"
            className="absolute bg-white border-none hover:bg-white hover:dark:bg-gray-700 btn btn-sm btn-circle right-4 top-4 dark:bg-gray-700">
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Delete food
          </h3>
          <p className="mt-4 grid">
          Are you sure you want to delete {`'${food.name}'`}?
          <label
              className="px-4 py-2 m-4 text-gray-100 bg-red-600 border-none rounded-lg hover:bg-red-700 btn ring-red-400 hover:ring-4"
              htmlFor="deleteDialog"
              onClick={() => deleteFood()}>
              Delete {food.name}
            </label>
          </p>
        </div>
      </div>
    </>
  );
};

export default DeleteFood;
