import { useSWRConfig } from 'swr';
import { toast } from 'react-toastify';
import type { food } from '@prisma/client';

const DeleteFood = ({ food }: { food: food }) => {
  const { mutate } = useSWRConfig();

  async function deleteFood() {
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
  }

  return (
    <>
      <label
        htmlFor={`delete${food.name}Dialog`}
        className="modal-button btn mt-1 mr-2 border-none bg-red-600 text-white ring-red-400 hover:bg-red-700 hover:ring-4">
        Delete
      </label>
      <input
        type="checkbox"
        id={`delete${food.name}Dialog`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative w-auto bg-white dark:bg-gray-700">
          <label
            htmlFor={`delete${food.name}Dialog`}
            className="btn btn-circle btn-sm absolute right-4 top-4 border-none bg-white hover:bg-white dark:bg-gray-700 hover:dark:bg-gray-700">
            ✕
          </label>
          <h3 className="text-lg font-bold">Delete food</h3>
          <p className="mt-4 grid">
            Are you sure you want to delete {`'${food.name}'`}?
            <label
              className="btn m-4 rounded-lg border-none bg-red-600 px-4 py-2 text-gray-100 ring-red-400 hover:bg-red-700 hover:ring-4"
              htmlFor={`delete${food.name}Dialog`}
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
