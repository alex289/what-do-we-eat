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
  const [tags, setTags] = useState('-');

  function saveFilter() {
    filterer({
      effort: effort,
      deliverable: deliverable,
      cheeseometer: cheeseometer,
      tags: tags,
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
        className="modal-button btn btn-primary mb-4 ml-3 normal-case">
        Filter food
      </label>
      <input type="checkbox" id="dialog" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-auto bg-white dark:bg-gray-700">
          <label
            htmlFor="dialog"
            className="btn btn-circle btn-sm absolute right-4 top-4 border-none bg-white hover:bg-white dark:bg-gray-700 hover:dark:bg-gray-700">
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
              className="select w-full max-w-xs bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
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
              className="select w-full max-w-xs bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
              onChange={(e) => setDeliverable(e.target.value)}
              value={deliverable}>
              <option value="-">-</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <label className="my-2 mr-2 text-black dark:text-white">Tags</label>
            <select
              className="select w-full max-w-xs bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
              onChange={(e) => setTags(e.target.value)}
              value={tags}>
              <option value="-">-</option>
              <option value="Veggie">Veggie</option>
              <option value="Vegan">Vegan</option>
            </select>

            <label className="my-2 mr-2 text-black dark:text-white">
              Effort
            </label>
            <select
              className="select w-full max-w-xs bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
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

            <div className="mx-auto mt-4 flex">
              <label
                className="btn mr-4 border-none bg-green-600 px-6 text-white ring-green-400 hover:bg-green-700 hover:ring-4"
                htmlFor="dialog"
                onClick={() => saveFilter()}>
                Apply filter
              </label>
              <label
                className="btn ml-4 border-none bg-red-600 px-6 text-white ring-red-400 hover:bg-red-700 hover:ring-4"
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
