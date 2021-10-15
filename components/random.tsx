import foodList from '@food';

const Random = () => {
  const randomFood =
    foodList.food[Math.floor(Math.random() * foodList.food.length)];
  return (
    <ul className="grid xl:grid-flow-row xl:grid-cols-5 gap-4 md:grid-flow-column px-2">
      <li className="max-w-md py-6 px-8 shadow-lg rounded-lg">
        <p className="text-lg font-semibold">{randomFood.name}</p>
        <p>Size: {randomFood.size}</p>
        <p>Deliverable: {randomFood.deliverable ? 'Yes' : 'No'}</p>
        <p>Effort: {randomFood.effort}</p>
      </li>
    </ul>
  );
};

export default Random;
