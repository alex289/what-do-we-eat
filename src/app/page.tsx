import { db } from '@/lib/db';
import { FoodItem } from '@/components/food-item';
import { FoodFilter } from '@/components/food-filter';

export default async function Home() {
  const foodList = await db.query.food.findMany();
  return (
    <>
      <FoodFilter />
      <main className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {foodList.map((food) => (
          <FoodItem foodItem={food} key={food.id} />
        ))}
      </main>
    </>
  );
}
