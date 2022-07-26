import { Suspense } from 'react';
import Image from 'next/future/image';

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
    <ul className="md:grid-flow-column mt-3 grid gap-6 px-2 md:mt-0 md:grid-cols-2 xl:grid-flow-row xl:grid-cols-5">
      {foodList.map((food, index) => (
        <li key={index} className="card border shadow-xl dark:border-gray-700">
          <figure className="relative h-64 w-full xl:h-48">
            {food.image && (
              <Image
                src={food.image}
                alt={food.name}
                width={564}
                height={564}
                loading="lazy"
                className="absolute inset-0 h-64 w-full xl:h-48"
              />
            )}
          </figure>
          <div className="card-body px-5 text-black dark:text-white">
            <p className="card-title">
              <a
                className="hover:underline"
                href={`https://www.chefkoch.de/rs/s0/${food.name.replace(
                  / /g,
                  '+'
                )}/Rezepte.html`}
                target="_blank"
                rel="noreferrer noopener">
                {food.name}
              </a>
              <Favorite
                foodId={food.id}
                favorite={favorite?.filter((x) => x.id === food.id)}
              />
            </p>
            <div className="flex text-base">
              Cheeseometer:
              <div className="align-right rating">
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
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name={'rating-2-' + food.id}
                  readOnly
                  disabled
                  checked={food.cheeseometer === 2}
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name={'rating-2-' + food.id}
                  readOnly
                  disabled
                  checked={food.cheeseometer === 3}
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name={'rating-2-' + food.id}
                  readOnly
                  disabled
                  checked={food.cheeseometer === 4}
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name={'rating-2-' + food.id}
                  readOnly
                  disabled
                  checked={food.cheeseometer === 5}
                  className="mask mask-star-2 bg-orange-400"
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
