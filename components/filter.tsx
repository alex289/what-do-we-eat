import Image from 'next/image';

import { Food } from '@/types/food';

const Filter = ({
  size,
  effort,
  deliverable,
  cheeseometer,
  foodList,
}: {
  size: string;
  effort: string;
  deliverable: string;
  cheeseometer: string;
  foodList: Food[];
}) => {
  let filterSize = size;
  let filterEffort = effort;
  let filterDeliverable = deliverable;
  let filterCheeseometer = cheeseometer;

  const ignoreFilter = (food: Food) => {
    if (size === '-') {
      filterSize = food.size;
    }
    if (effort === '-') {
      filterEffort = food.effort.toString();
    }
    if (deliverable === '-') {
      filterDeliverable = food.deliverable.toString();
    }
    if (cheeseometer === '-') {
      filterCheeseometer = food.cheeseometer.toString();
    }
  };
  return (
    <ul className="px-2 grid xl:grid-flow-row xl:grid-cols-5 gap-5 md:grid-flow-column">
      {foodList.map((food, index) => {
        ignoreFilter(food);
        if (
          food.size === filterSize &&
          food.effort === Number(filterEffort) &&
          food.deliverable === (filterDeliverable === 'true') &&
          food.cheeseometer === Number(filterCheeseometer)
        ) {
          return (
            <li key={index} className="max-w-md px-8 py-6 rounded-lg shadow-lg">
              <div className="w-full mx-auto">
                <Image
                  src={
                    food.image === ''
                      ? '/static/images/placeholder.png'
                      : food.image
                  }
                  width={200}
                  height={150}
                  alt={food.name}
                ></Image>
              </div>
              <p className="text-lg font-semibold">{food.name}</p>
              <p>Size: {food.size}</p>
              <p>Cheeseometer: {food.cheeseometer}/5</p>
              <p>Deliverable: {food.deliverable ? 'Yes' : 'No'}</p>
              <p>Effort: {food.effort}/10</p>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Filter;
