import type { FilterConfig, FoodConfig } from '@/types/config';
import type { Food } from '@/types/food';

export function randomFood(foodList: Food[]) {
  const food = foodList[Math.floor(Math.random() * foodList.length)];
  return food === undefined ? [] : [food];
}

export function searchFood(foodList: Food[], input: string) {
  return foodList.filter((food) =>
    food.name
      .toLowerCase()
      .match(input.replace(/[|&;$%@"<>()+,?]/g, '').toLowerCase())
  );
}

export function filterFood(foodList: Food[], config: FilterConfig) {
  const filteredList: Food[] = [];
  let filterEffort = config.effort;
  let filterDeliverable = config.deliverable;
  let filterCheeseometer = config.cheeseometer;

  const ignoreFilter = (food: Food) => {
    if (config.effort === '-') {
      filterEffort = food.effort.toString();
    }
    if (config.deliverable === '-') {
      filterDeliverable = food.deliverable.toString();
    }
    if (config.cheeseometer === '-') {
      filterCheeseometer = food.cheeseometer.toString();
    }
  };

  foodList.map((food) => {
    ignoreFilter(food);
    if (
      food.effort === Number(filterEffort) &&
      food.deliverable === (filterDeliverable === 'true') &&
      food.cheeseometer === Number(filterCheeseometer)
    ) {
      filteredList.push(food);
    }
  });

  return filteredList;
}

export function handleFood(
  foodList: Food[],
  config: FoodConfig,
  filterConfig: FilterConfig
) {
  let currentFoodList = foodList;

  if (config.filter) {
    currentFoodList = filterFood(currentFoodList, filterConfig);
  }
  if (config.search) {
    currentFoodList = searchFood(currentFoodList, config.searchInput || '');
  }
  if (config.random) {
    currentFoodList = randomFood(currentFoodList);
  }

  return currentFoodList;
}
