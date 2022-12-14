import type { FoodConfig } from '@/types/config';
import type { food } from '@prisma/client';

export function randomFood(foodList: food[]) {
  const food = foodList[Math.floor(Math.random() * foodList.length)];
  return food === undefined ? [] : [food];
}

export function handleFood(foodList: food[], config: FoodConfig) {
  let currentFoodList = foodList;

  if (config.random) {
    currentFoodList = randomFood(currentFoodList);
  }

  return currentFoodList;
}
