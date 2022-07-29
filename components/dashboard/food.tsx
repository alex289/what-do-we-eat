import Image from 'next/future/image';
import dynamic from 'next/dynamic';
import type { food } from '@prisma/client';

import CheckMark from '@/components/icons/CheckMark';
import CrossMark from '@/components/icons/CrossMark';
import { Suspense } from 'react';

const UpdateFood = dynamic(() => import('@/components/dashboard/updateFood'));
const DeleteFood = dynamic(() => import('@/components/dashboard/deleteFood'));

const DashboardFood = ({ foodList }: { foodList: food[] }) => {
  return (
    <Suspense>
      <ul className="md:grid-flow-column mt-3 grid gap-6 px-2 md:mt-0 md:grid-cols-2 xl:grid-flow-row xl:grid-cols-5">
        {foodList.map((food, index) => (
          <li
            key={index}
            className="card border shadow-xl dark:border-gray-700">
            <figure className="relative h-64 w-full xl:h-48">
              {food.image && (
                <Image
                  src={food.image}
                  alt={food.name}
                  width={564}
                  height={564}
                  quality={100}
                  className="absolute inset-0 h-64 w-full xl:h-48"></Image>
              )}
            </figure>
            <div className="card-body text-black dark:text-white">
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
                <span className="stat-value text-base">{food.effort}/10</span>
              </p>
              <div className="grid grid-flow-col grid-cols-3">
                {food.tags &&
                  food.tags.split(',').map((tag) => (
                    <p className="text-base" key={tag.trim()}>
                      <span className="badge-xl badge badge-success p-3">
                        {tag.trim()}
                      </span>
                    </p>
                  ))}
              </div>
              {!food.tags && <span className="badge invisible"></span>}
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
