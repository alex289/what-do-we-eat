import { useState } from 'react';

import axios from 'axios';
import { useSWRConfig } from 'swr';

import type { Food } from '@/types/food';
import { toast } from 'react-toastify';

import FormLayout from '@/components/form/formLayout';
import FormHeader from '@/components/form/formHeader';

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
          <FormLayout>
            <FormHeader title="Delete food" exit={setShowModal} />
            <div className="relative flex-auto p-6">
              <p className="text-lg leading-relaxed">
                Are you sure you want to delete {`'${food.name}'`}?
              </p>
            </div>
            <button
              className="p-2 px-5 m-3 mb-4 text-lg text-gray-100 bg-red-600 rounded-lg ring-red-400 hover:ring-4"
              type="button"
              onClick={() => deleteFood()}
            >
              Delete {food.name}
            </button>
          </FormLayout>
          <div className="fixed inset-0 z-40 bg-gray-800 opacity-25"></div>
        </>
      )}
    </>
  );
};

export default DeleteFood;
