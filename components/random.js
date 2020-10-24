import * as foodList from '../food.json';

const Random = () => {
  const randomFood =
    foodList.food[Math.floor(Math.random() * foodList.food.length)];
  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item">Name: {randomFood.name}</li>
      <li className="list-group-item">Size: {randomFood.size}</li>
      <li className="list-group-item">
        Deliverable: {randomFood.deliverable ? 'Yes' : 'No'}
      </li>
      <li className="list-group-item">Effort: {randomFood.effort}</li>
      <style jsx>{`
        ul {
          padding: 5px;
        }
      `}</style>
    </ul>
  );
};

export default Random;
