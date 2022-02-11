import Image from 'next/image';
import dynamic from 'next/dynamic';

import type { Food } from '@/types/food';

const UpdateFood = dynamic(() => import('@/components/dashboard/updateFood'));
const DeleteFood = dynamic(() => import('@/components/dashboard/deleteFood'));

const DashboardFood = ({ foodList }: { foodList: Food[] }) => {
  return (
    <ul className="px-2 mt-3 md:mt-0 grid xl:grid-flow-row xl:grid-cols-5 md:grid-cols-2 gap-6 md:grid-flow-column">
      {foodList.map((food, index) => (
        <li
          key={index}
          className="max-w-md mx-2 overflow-hidden rounded-lg shadow-lg"
        >
          {food.image.startsWith('https://i.pinimg.com/') && (
            <div className="relative w-full h-64 xl:h-48">
              <Image src={food.image} layout="fill" alt={food.name}></Image>
            </div>
          )}

          <div className="px-6 py-4">
            <p className="mb-1 text-xl font-bold">{food.name}</p>
            <p className="text-base">Id: {food.id}</p>
            <p className="text-base">Size: {food.size}</p>
            <p className="text-base">Cheeseometer: {food.cheeseometer}/5</p>
            <p className="text-base">
              Deliverable: {food.deliverable ? 'Yes' : 'No'}
            </p>
            <p className="text-base">Effort: {food.effort}/10</p>
            <UpdateFood food={food} />
            <DeleteFood food={food} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DashboardFood;
