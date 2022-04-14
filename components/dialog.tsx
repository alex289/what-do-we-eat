import { useState } from 'react';

import type { FilterConfig, FoodConfig } from '@/types/config';

export default function Dialog({
  filterer,
  config,
  setConfig,
}: {
  filterer: (filter: FilterConfig) => void;
  config: FoodConfig;
  setConfig: (config: FoodConfig) => void;
}) {
  const [deliverable, setDeliverable] = useState('true');
  const [effort, setEffort] = useState('5');
  const [cheeseometer, setCheeseometer] = useState('0');
  const [nutrition, setNutrition] = useState('-');

  function saveFilter() {
    filterer({
      effort: effort,
      deliverable: deliverable,
      cheeseometer: cheeseometer,
      nutrition: nutrition,
    });

    setConfig({
      filter: true,
      random: config.random,
      search: config.search,
      searchInput: config.searchInput,
    });
  }

  function clearFilter() {
    setConfig({
      filter: false,
      random: config.random,
      search: config.search,
      searchInput: config.searchInput,
    });
  }

  return (
    <>
      <label
        htmlFor="dialog"
        className="mb-4 ml-3 normal-case btn btn-primary modal-button">
        Filter food
      </label>
      <input type="checkbox" id="dialog" className="modal-toggle" />
      <div className="modal">
        <div className="relative w-auto bg-white modal-box dark:bg-gray-700">
          <label
            htmlFor="dialog"
            className="absolute bg-white border-none hover:bg-white hover:dark:bg-gray-700 btn btn-sm btn-circle right-4 top-4 dark:bg-gray-700">
            ✕
          </label>
          <h3 className="text-lg font-bold text-black dark:text-white">
            Filter food
          </h3>
          <div className="flex flex-col">
            <label className="my-2 mr-2 text-black dark:text-white">
              Cheeseometer
            </label>
            <select
              className="w-full max-w-xs text-black bg-gray-200 select dark:text-white dark:bg-gray-600"
              onChange={(e) => setCheeseometer(e.target.value)}
              value={cheeseometer}>
              <option value="-">-</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <label className="my-2 mr-2 text-black dark:text-white">
              Deliverable
            </label>
            <select
              className="w-full max-w-xs text-black bg-gray-200 select dark:text-white dark:bg-gray-600"
              onChange={(e) => setDeliverable(e.target.value)}
              value={deliverable}>
              <option value="-">-</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <label className="my-2 mr-2 text-black dark:text-white">
              Nutrition
            </label>
            <select
              className="w-full max-w-xs text-black bg-gray-200 select dark:text-white dark:bg-gray-600"
              onChange={(e) => setNutrition(e.target.value)}
              value={nutrition}>
              <option value="-">-</option>
              <option value="Veggie">Veggie</option>
              <option value="Vegan">Vegan</option>
            </select>

            <label className="my-2 mr-2 text-black dark:text-white">
              Effort
            </label>
            <select
              className="w-full max-w-xs text-black bg-gray-200 select dark:text-white dark:bg-gray-600"
              onChange={(e) => setEffort(e.target.value)}
              value={effort}>
              <option value="-">-</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>

            <div className="flex mx-auto mt-4">
              <label
                className="px-6 mr-4 text-white bg-green-600 border-none btn hover:bg-green-700 ring-green-400 hover:ring-4"
                htmlFor="dialog"
                onClick={() => saveFilter()}>
                Apply filter
              </label>
              <label
                className="px-6 ml-4 text-white bg-red-600 border-none btn hover:bg-red-700 ring-red-400 hover:ring-4"
                htmlFor="dialog"
                onClick={() => clearFilter()}>
                Clear filter
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
