import type { Food } from '@/server/db/types';

export function randomFood(foodList: Food[]) {
  const food = foodList[Math.floor(Math.random() * foodList.length)];
  return food === undefined ? [] : [food];
}

export function handleFood(foodList: Food[], randomize: boolean) {
  let currentFoodList = foodList;

  if (randomize) {
    currentFoodList = randomFood(currentFoodList);
  }

  return currentFoodList;
}
