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
  <ul className="md:grid-flow-column mx-2 mt-3 grid gap-6 px-2 md:mt-0 md:grid-cols-2 xl:grid-flow-row xl:grid-cols-5 2xl:mx-8">
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
              loading="lazy"
              className="absolute inset-0 h-64 w-full rounded-tl-lg rounded-tr-lg xl:h-48"
            />
          )}
        </figure>
        <div className="px-5 text-black dark:text-white">
          <p className="my-4 flex text-lg font-bold">
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
          <div className="my-2 flex text-base">
            Cheeseometer:
            <div className="align-right ml-1 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-6 w-6 text-orange-400 ${
                  !(food.cheeseometer >= 1) && 'opacity-20'
                }`}>
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-6 w-6 text-orange-400 ${
                  !(food.cheeseometer >= 2) && 'opacity-20'
                }`}>
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-6 w-6 text-orange-400 ${
                  !(food.cheeseometer >= 3) && 'opacity-20'
                }`}>
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-6 w-6 text-orange-400 ${
                  !(food.cheeseometer >= 4) && 'opacity-20'
                }`}>
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-6 w-6 text-orange-400 ${
                  !(food.cheeseometer === 5) && 'opacity-20'
                }`}>
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
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
          <div className="mb-6 mt-4 grid grid-flow-col grid-cols-3">
            {food.tags &&
              food.tags.split(',').map((tag) => (
                <p className="text-base" key={tag.trim()}>
                  <span className="my-4 rounded-full bg-green-600 py-1 px-3 text-sm">
                    {tag.trim()}
                  </span>
                </p>
              ))}
          </div>
        </div>
      </li>
    ))}
    {foodList.length === 0 && (
      <li className="ml-4 text-black dark:text-white">No results</li>
    )}
  </ul>
);

export default Food;
