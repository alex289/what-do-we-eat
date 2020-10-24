import * as foodList from '../food.json';

const Food = () => (
  <div className="container">
    {foodList.food.map((food, index) => (
      <ul className="list-group list-group-flush" key={index}>
        <li className="list-group-item">Name: {food.name}</li>
        <li className="list-group-item">Size: {food.size}</li>
        <li className="list-group-item">
          Deliverable: {food.deliverable ? 'Yes' : 'No'}
        </li>
        <li className="list-group-item">Effort: {food.effort}</li>
      </ul>
    ))}
    <style jsx>{`
      ul {
        padding: 5px;
        padding-bottom: 40px;
      }
    `}</style>
  </div>
);

export default Food;
