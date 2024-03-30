import dynamic from 'next/dynamic';
import Image from 'next/image';

import CheckMark from '@/components/icons/CheckMark';
import CrossMark from '@/components/icons/CrossMark';

import type { food } from '@prisma/client';

const UpdateFood = dynamic(() => import('@/components/dashboard/updateFood'));
const DeleteFood = dynamic(() => import('@/components/dashboard/deleteFood'));

const DashboardFood = ({ foodList }: { foodList: food[] }) => {
  return (
    <ul className="md:grid-flow-column 2xl:grid-cols-fit mx-2 mt-3 grid gap-6 px-2 sm:grid-cols-2 md:mt-0 lg:grid-cols-3 xl:grid-cols-5 2xl:mx-8 2xl:grid-cols-6">
      {foodList.map((food, index) => (
        <li
          key={index}
          className="rounded-lg border shadow-xl dark:border-gray-700">
          <figure className="relative h-64 w-full xl:h-48">
            {food.image && (
              <Image
                src={food.image}
                alt={food.name}
                width={564}
                height={564}
                quality={100}
                className="absolute inset-0 h-64 w-full rounded-tl-lg  rounded-tr-lg object-cover xl:h-48"></Image>
            )}
          </figure>
          <div className="px-5 text-black dark:text-white">
            <p className="my-4 flex text-lg font-bold">{food.name}</p>
            <p className="my-2 text-base">Id: {food.id}</p>
            <p className="my-2 text-base">
              Cheeseometer: {food.cheeseometer}/5
            </p>
            <p className="my-2 flex text-base">
              Deliverable:{' '}
              <span className="ml-2">
                {food.deliverable ? <CheckMark /> : <CrossMark />}
              </span>
            </p>
            <p className="my-2 text-base">
              Effort:{' '}
              <span className="stat-value text-base">{food.effort}/10</span>
            </p>
            <div className="mb-4 mt-4 grid grid-flow-col grid-cols-3">
              {food.tags &&
                food.tags !== '' &&
                food.tags.split(',').map((tag) => (
                  <p className="text-base" key={tag.trim()}>
                    <span className="my-4 rounded-full bg-green-600 px-3 py-1 text-sm">
                      {tag.trim()}
                    </span>
                  </p>
                ))}
            </div>
            <div className={`mb-4 flex flex-col gap-2 ${!food.tags && 'pt-6'}`}>
              <UpdateFood food={food} />
              <DeleteFood food={food} />
            </div>
          </div>
        </li>
      ))}
      {foodList.length === 0 && (
        <li className="ml-4 text-black dark:text-white">No results</li>
      )}
    </ul>
  );
};

export default DashboardFood;
