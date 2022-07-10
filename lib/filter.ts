import type { FilterConfig, FoodConfig } from '@/types/config';
import type { food } from '@prisma/client';

export function randomFood(foodList: food[]) {
  const food = foodList[Math.floor(Math.random() * foodList.length)];
  return food === undefined ? [] : [food];
}

export function searchFood(foodList: food[], input: string) {
  return foodList.filter((food) =>
    food.name
      .toLowerCase()
      .match(input.replace(/[|&;$%@"<>()+,?]/g, '').toLowerCase())
  );
}

export function filterFood(foodList: food[], config: FilterConfig) {
  const filteredList: food[] = [];
  let filterEffort = config.effort;
  let filterDeliverable = config.deliverable;
  let filterCheeseometer = config.cheeseometer;
  let filterTags: string | null = config.tags;

  const ignoreFilter = (food: food) => {
    if (config.effort === '-') {
      filterEffort = food.effort.toString();
    }
    if (config.deliverable === '-') {
      filterDeliverable = food.deliverable.toString();
    }
    if (config.cheeseometer === '-') {
      filterCheeseometer = food.cheeseometer.toString();
    }
    if (config.tags === '-') {
      filterTags = typeof food.tags === 'string' ? food.tags : null;
    }
  };

  foodList.map((food) => {
    ignoreFilter(food);
    if (food.name === 'Pizza') {
      console.log(food.tags, filterTags);
      console.log(food.tags?.includes(filterTags || ''));
    }
    if (
      food.effort === Number(filterEffort) &&
      food.deliverable === (filterDeliverable === 'true') &&
      food.cheeseometer === Number(filterCheeseometer) &&
      (food.tags || '-').includes(filterTags || '-')
    ) {
      filteredList.push(food);
    }
  });

  return filteredList;
}

export function handleFood(
  foodList: food[],
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
