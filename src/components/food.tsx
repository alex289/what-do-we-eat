import { FoodCard } from './food-card';

import type { Favorite as FavoriteType, Food } from '@/server/db/types';

interface Props {
  foodList: Food[];
  favorite: FavoriteType[] | undefined;
  emailAddresses: string[] | undefined;
}

const Food = ({ foodList, favorite, emailAddresses }: Props) => (
  <ul className="md:grid-flow-column 2xl:grid-cols-fit mx-4 mt-3 grid gap-6 sm:grid-cols-2 md:mt-0 lg:grid-cols-3 xl:grid-cols-4 2xl:mx-8 2xl:grid-cols-4">
    {foodList.map((food, index) => (
      <li key={index}>
        <FoodCard
          food={food}
          favorite={favorite?.filter((fav) => fav.id === food.id)}
          emailAddresses={emailAddresses}
        />
      </li>
    ))}
    {foodList.length === 0 && (
      <li className="ml-4 text-black dark:text-white">No results</li>
    )}
  </ul>
);

export default Food;
