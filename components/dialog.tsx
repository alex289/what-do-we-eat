import { useState } from 'react';

import type { FilterConfig, FoodConfig } from '@/types/config';

import FormLayout from '@/components/form/formLayout';
import FormHeader from '@/components/form/formHeader';

export default function Dialog({
  filterer,
  config,
  setConfig,
}: {
  filterer: (filter: FilterConfig) => void;
  config: FoodConfig;
  setConfig: (config: FoodConfig) => void;
}) {
  const [showModal, setShowModal] = useState(false);
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

    setShowModal(false);
  }

  function clearFilter() {
    setConfig({
      filter: false,
      random: config.random,
      search: config.search,
      searchInput: config.searchInput,
    });

    setShowModal(false);
  }

  return (
    <>
      <button
        className="p-2 px-5 m-3 mb-4 text-lg text-gray-100 bg-purple-600 rounded-lg hover:ring-4 ring-purple-400"
        type="button"
        onClick={() => setShowModal(true)}>
        Filter food
      </button>
      {showModal && (
        <>
          <FormLayout>
            <FormHeader title="Filter food" exit={setShowModal} />
            <div className="relative flex-auto p-6">
              <div className="text-lg leading-relaxed">
                <label className="block max-w-lg text-left">
                  <span className="text-gray-700 dark:text-gray-300">
                    Cheeseometer
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
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

                <label className="block max-w-lg mt-2 text-left">
                  <span className="text-gray-700 dark:text-gray-300">
                    Deliverable
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
                  onChange={(e) => setDeliverable(e.target.value)}
                  value={deliverable}>
                  <option value="-">-</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                <label className="block max-w-lg mt-2 text-left">
                  <span className="text-gray-700 dark:text-gray-300">
                    Nutrition
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
                  onChange={(e) => setNutrition(e.target.value)}
                  value={nutrition}>
                  <option value="-">-</option>
                  <option value="Veggie">Veggie</option>
                  <option value="Vegan">Vegan</option>
                </select>

                <label className="block max-w-lg mt-2 text-left">
                  <span className="text-gray-700 dark:text-gray-300">
                    Effort
                  </span>
                </label>
                <select
                  className="block w-full mt-1 form-select"
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
              </div>
            </div>
            <button
              className="p-2 px-5 m-2 mb-4 text-lg text-gray-100 bg-green-600 rounded-lg hover:ring-4 ring-green-400"
              type="button"
              onClick={() => saveFilter()}>
              Show selection
            </button>

            <button
              className="p-2 px-5 m-2 mb-4 text-lg text-gray-100 bg-red-600 rounded-lg hover:ring-4 ring-red-400"
              type="button"
              onClick={() => clearFilter()}>
              Remove filter
            </button>
          </FormLayout>
          <div className="fixed inset-0 z-40 bg-gray-800 opacity-25"></div>
        </>
      )}
    </>
  );
}
