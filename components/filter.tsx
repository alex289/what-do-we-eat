import { Food } from '@/types/food';

const Filter = ({
  size,
  effort,
  deliverable,
  foodList,
}: {
  size: string;
  effort: string;
  deliverable: string;
  foodList: Food[];
}) => {
  let filterSize = size;
  let filterEffort = effort;
  let filterDeliverable = deliverable;

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
  };
  return (
    <ul className="px-2 grid xl:grid-flow-row xl:grid-cols-5 gap-5 md:grid-flow-column">
      {foodList.map((food, index) => {
        ignoreFilter(food);
        if (
          food.size === filterSize &&
          food.effort === parseInt(filterEffort) &&
          food.deliverable === (filterDeliverable === 'true')
        ) {
          return (
            <li key={index} className="max-w-md px-8 py-6 rounded-lg shadow-lg">
              <p className="text-lg font-semibold">{food.name}</p>
              <p>Size: {food.size}</p>
              <p>Deliverable: {food.deliverable ? 'Yes' : 'No'}</p>
              <p>Effort: {food.effort}</p>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Filter;
