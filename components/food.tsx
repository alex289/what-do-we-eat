import foodList from '@food';

const Food = () => (
  <ul className="grid xl:grid-flow-row xl:grid-cols-5 gap-5 md:grid-flow-column px-2">
    {foodList.food.map((food, index) => (
      <li key={index} className="max-w-md py-6 px-8 shadow-lg rounded-lg">
        <p className="text-lg font-semibold">{food.name}</p>
        <p>Size: {food.size}</p>
        <p>Deliverable: {food.deliverable ? 'Yes' : 'No'}</p>
        <p>Effort: {food.effort}</p>
      </li>
    ))}
  </ul>
);

export default Food;
