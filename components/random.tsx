import { Food } from '@/types/food';

const Random = ({ foodList }: { foodList: Food[] }) => {
  const randomFood = foodList[Math.floor(Math.random() * foodList.length)];
  return (
    <ul className="px-2 grid xl:grid-flow-row xl:grid-cols-5 gap-4 md:grid-flow-column">
      <li className="max-w-md px-8 py-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold">{randomFood.name}</p>
        <p>Size: {randomFood.size}</p>
        <p>Deliverable: {randomFood.deliverable ? 'Yes' : 'No'}</p>
        <p>Effort: {randomFood.effort}</p>
      </li>
    </ul>
  );
};

export default Random;
