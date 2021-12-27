import { Food } from '@/types/food';
import axios from 'axios';
import UpdateFood from './updateFood';

const DashboardFood = ({ foodList }: { foodList: Food[] }) => {
  async function deleteFood(foodId: number) {
    await axios.delete('/api/food/delete/' + foodId);

    window.location.reload();
  }

  return (
    <ul className="px-2 grid xl:grid-flow-row xl:grid-cols-5 gap-5 md:grid-flow-column">
      {foodList.map((food, index) => (
        <li key={index} className="max-w-md px-8 py-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">{food.name}</p>
          <p>Id: {food.id}</p>
          <p>Size: {food.size}</p>
          <p>Deliverable: {food.deliverable ? 'Yes' : 'No'}</p>
          <p>Effort: {food.effort}</p>
          <UpdateFood food={food}></UpdateFood>
          <button
            onClick={() => deleteFood(food.id)}
            className="p-3 mt-1 ml-2 text-gray-100 bg-red-600 rounded-lg hover:ring-4 ring-red-400"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DashboardFood;
