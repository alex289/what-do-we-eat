import Image from 'next/image';
import type { food } from '@prisma/client';

const Food = ({ foodList }: { foodList: food[] }) => (
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
        <div className="text-black card-body dark:text-white">
          <p className="card-title">{food.name}</p>
          <p className="text-base">Cheeseometer: {food.cheeseometer}/5</p>
          <p className="text-base">
            Deliverable: {food.deliverable ? 'Yes' : 'No'}
          </p>
          <p className="text-base">Effort: {food.effort}/10</p>
          <p className="text-base">{food.nutrition}</p>
        </div>
      </li>
    ))}
    {foodList.length === 0 && (
      <li className="ml-4 text-black dark:text-white">No results</li>
    )}
  </ul>
);

export default Food;
