import { useState } from 'react';

type Filter = {
  effort: string;
  size: string;
  deliverable: string;
};

export default function Dialog({
  filterer,
}: {
  filterer: (filter: Filter) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [deliverable, setDeliverable] = useState('true');
  const [size, setSize] = useState('4 people');
  const [effort, setEffort] = useState('5');

  function saveFilter() {
    filterer({
      effort: effort,
      size: size,
      deliverable: deliverable,
    });

    setShowModal(false);
  }

  return (
    <>
      <button
        className="p-2 px-5 m-3 mb-4 bg-purple-600 text-gray-100 text-lg rounded-lg hover:ring-4 ring-purple-400"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Filter food
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-900 outline-none focus:outline-none">
                {/*header*/}
                <div className="mx-16 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="mr-4 text-3xl font-semibold">Filter food</h3>
                  <button
                    className="p-1 ml-4 bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black hover:text-gray-800 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    <label className="block text-left max-w-lg mt-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        Size
                      </span>
                      <select
                        className="form-select block w-full mt-1"
                        onChange={(e) => setSize(e.target.value)}
                        value={size}
                      >
                        <option value="-">-</option>
                        <option value="1 person">1 person</option>
                        <option value="4 people">4 people</option>
                        <option value="all">all</option>
                      </select>
                    </label>
                    <label className="block text-left max-w-lg mt-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        Deliverable
                      </span>
                      <select
                        className="form-select block w-full mt-1"
                        onChange={(e) => setDeliverable(e.target.value)}
                        value={deliverable}
                      >
                        <option value="-">-</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </label>
                    <label className="block text-left max-w-lg mt-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        Effort
                      </span>
                      <select
                        className="form-select block w-full mt-1"
                        onChange={(e) => setEffort(e.target.value)}
                        value={effort}
                      >
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
                    </label>
                  </p>
                </div>
                {/*footer*/}
                <button
                  className="p-2 px-5 m-3 mb-4 bg-green-600 text-gray-100 text-lg rounded-lg hover:ring-4 ring-green-400"
                  type="button"
                  onClick={() => saveFilter()}
                >
                  Show selection
                </button>

                <button
                  className="p-2 px-5 m-3 mb-4 bg-red-600 text-gray-100 text-lg rounded-lg hover:ring-4 ring-red-400"
                  type="button"
                  onClick={() => window.location.reload()}
                >
                  Remove filter
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
