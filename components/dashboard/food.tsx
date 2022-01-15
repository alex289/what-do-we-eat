import Image from 'next/image';

import axios from 'axios';

import type { Food } from '@/types/food';

import UpdateFood from '@/components/dashboard/updateFood';

const DashboardFood = ({ foodList }: { foodList: Food[] }) => {
  async function deleteFood(foodId: number) {
    await axios.delete('/api/food/delete/' + foodId);

    window.location.reload();
  }

  return (
    <ul className="px-2 grid xl:grid-flow-row xl:grid-cols-5 gap-5 md:grid-flow-column">
      {foodList.map((food, index) => (
        <li key={index} className="max-w-md px-8 py-6 rounded-lg shadow-lg">
          <div className="w-full mx-auto">
            {food.image.startsWith('https://i.pinimg.com/') && (
              <Image
                src={food.image}
                width={200}
                height={150}
                alt={food.name}
              ></Image>
            )}
          </div>
          <p className="text-lg font-semibold">{food.name}</p>
          <p>Id: {food.id}</p>
          <p>Size: {food.size}</p>
          <p>Cheeseometer: {food.cheeseometer}/5</p>
          <p>Deliverable: {food.deliverable ? 'Yes' : 'No'}</p>
          <p>Effort: {food.effort}/10</p>
          <UpdateFood food={food}></UpdateFood>
          <button
            onClick={() => deleteFood(food.id)}
            className="p-3 mt-1 ml-2 text-gray-100 bg-red-600 rounded-lg hover:ring-4 ring-red-400"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DashboardFood;
