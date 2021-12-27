import { Food } from '@/types/food';

const Search = ({ input, foodList }: { input: string; foodList: Food[] }) => {
  return (
    <ul className="px-2 grid xl:grid-flow-row xl:grid-cols-5 gap-5 md:grid-flow-column">
      {foodList.map((food, index) => {
        if (food.name.toLowerCase().match(input.toLowerCase())) {
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

export default Search;
