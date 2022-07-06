import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { food } from '@prisma/client';

import CheckMark from '@/components/icons/CheckMark';
import CrossMark from '@/components/icons/CrossMark';
import { Suspense } from 'react';

const UpdateFood = dynamic(() => import('@/components/dashboard/updateFood'));
const DeleteFood = dynamic(() => import('@/components/dashboard/deleteFood'));

const DashboardFood = ({ foodList }: { foodList: food[] }) => {
  return (
    <Suspense fallback={null}>
      <ul className="px-2 mt-3 md:mt-0 grid xl:grid-flow-row xl:grid-cols-5 md:grid-cols-2 gap-6 md:grid-flow-column">
        {foodList.map((food, index) => (
          <li
            key={index}
            className="border shadow-xl card dark:border-gray-700">
            <figure className="relative w-full h-64 xl:h-48">
              {food.image.startsWith('https://i.pinimg.com/') && (
                <Image
                  src={food.image}
                  layout="fill"
                  alt={food.name}
                  quality={100}></Image>
              )}
            </figure>
            <div className="text-black card-body dark:text-white">
              <p className="card-title">{food.name}</p>
              <p className="text-base">Id: {food.id}</p>
              <p className="text-base">Cheeseometer: {food.cheeseometer}/5</p>
              <p className="flex text-base">
                Deliverable:{' '}
                <span className="ml-2">
                  {food.deliverable ? <CheckMark /> : <CrossMark />}
                </span>
              </p>
              <p className="text-base">
                Effort:{' '}
                <span className="text-base stat-value">{food.effort}/10</span>
              </p>
              {food.nutrition && (
                <p className="text-base">
                  <span className="p-3 badge badge-xl badge-success">
                    {food.nutrition}
                  </span>
                </p>
              )}
              {!food.nutrition && <span className="invisible badge"></span>}
              <UpdateFood food={food} />
              <DeleteFood food={food} />
            </div>
          </li>
        ))}
        {foodList.length === 0 && (
          <li className="ml-4 text-black dark:text-white">No results</li>
        )}
      </ul>
    </Suspense>
  );
};

export default DashboardFood;
