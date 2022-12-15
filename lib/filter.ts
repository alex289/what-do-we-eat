import type { food } from '@prisma/client';

export function randomFood(foodList: food[]) {
  const food = foodList[Math.floor(Math.random() * foodList.length)];
  return food === undefined ? [] : [food];
}

export function handleFood(foodList: food[], randomize: boolean) {
  let currentFoodList = foodList;

  if (randomize) {
    currentFoodList = randomFood(currentFoodList);
  }

  return currentFoodList;
}
