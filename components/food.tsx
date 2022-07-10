import { Suspense } from 'react';
import Image from 'next/image';

import type { favorite, food } from '@prisma/client';

import Favorite from '@/components/Favorite';
import CheckMark from '@/components/icons/CheckMark';
import CrossMark from '@/components/icons/CrossMark';

type Props = {
  foodList: food[];
  favorite: favorite[] | undefined;
};

const Food = ({ foodList, favorite }: Props) => (
  <Suspense fallback={null}>
    <ul className="px-2 mt-3 md:mt-0 grid xl:grid-flow-row xl:grid-cols-5 md:grid-cols-2 gap-6 md:grid-flow-column">
      {foodList.map((food, index) => (
        <li key={index} className="border shadow-xl card dark:border-gray-700">
          <figure className="relative w-full h-64 xl:h-48">
            {food.image.startsWith('https://i.pinimg.com/') && (
              <Image
                src={food.image}
                layout="fill"
                alt={food.name}
                quality={100}></Image>
            )}
          </figure>
          <div className="px-5 text-black card-body dark:text-white">
            <p className="card-title">
              {food.name}{' '}
              <Favorite
                foodId={food.id}
                favorite={favorite?.filter((x) => x.id === food.id)}
              />
            </p>
            <div className="flex text-base">
              Cheeseometer:
              <div className="rating align-right">
                <input
                  type="radio"
                  name={'rating-2-' + food.id}
                  className="rating-hidden"
                  readOnly
                  disabled
                  checked={food.cheeseometer === 0}
                />
                <input
                  type="radio"
                  name={'rating-2-' + food.id}
                  readOnly
                  disabled
                  checked={food.cheeseometer === 1}
                  className="bg-orange-400 mask mask-star-2"
                />
                <input
                  type="radio"
                  name={'rating-2-' + food.id}
                  readOnly
                  disabled
                  checked={food.cheeseometer === 2}
                  className="bg-orange-400 mask mask-star-2"
                />
                <input
                  type="radio"
                  name={'rating-2-' + food.id}
                  readOnly
                  disabled
                  checked={food.cheeseometer === 3}
                  className="bg-orange-400 mask mask-star-2"
                />
                <input
                  type="radio"
                  name={'rating-2-' + food.id}
                  readOnly
                  disabled
                  checked={food.cheeseometer === 4}
                  className="bg-orange-400 mask mask-star-2"
                />
                <input
                  type="radio"
                  name={'rating-2-' + food.id}
                  readOnly
                  disabled
                  checked={food.cheeseometer === 5}
                  className="bg-orange-400 mask mask-star-2"
                />
              </div>
            </div>
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
            <div className="grid grid-flow-col grid-cols-3">
              {food.tags &&
                food.tags.split(',').map((tag) => (
                  <p className="text-base" key={tag.trim()}>
                    <span className="p-3 badge badge-xl badge-success">
                      {tag.trim()}
                    </span>
                  </p>
                ))}
            </div>
            {!food.tags && <span className="invisible badge"></span>}
          </div>
        </li>
      ))}
      {foodList.length === 0 && (
        <li className="ml-4 text-black dark:text-white">No results</li>
      )}
    </ul>
  </Suspense>
);

export default Food;
