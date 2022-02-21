import { useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

const CreateFood = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [deliverable, setDeliverable] = useState('true');
  const [cheeseometer, setCheeseometer] = useState('0');
  const [effort, setEffort] = useState('0');

  const { mutate } = useSWRConfig();

  async function saveFood() {
    const res = await axios.post('/api/food/create', {
      name: name,
      image: image,
      deliverable: deliverable === 'true' ? true : false,
      cheeseometer: Number(cheeseometer),
      effort: Number(effort),
    });

    if (res.status !== 200) {
      toast.error(`Failed updating '${name}': ${res.statusText}`);
      return;
    }

    mutate('/api/food');
    setShowModal(false);
    toast.success(`Created '${name}'`);
  }

  return (
    <>
      <button
        className="p-2 px-5 m-3 mb-4 text-lg text-gray-100 bg-green-600 rounded-lg hover:ring-4 ring-green-400"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add food
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full border-0 rounded-lg shadow-lg outline-none bg-gray-50 dark:bg-gray-700 focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 mx-16 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="mr-4 text-3xl font-semibold">Add food</h3>
                  <button
                    className="float-right p-1 ml-4 text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block w-6 h-6 text-2xl text-black outline-none dark:text-white hover:text-gray-800 focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <p className="text-lg leading-relaxed text-blueGray-500">
                    <label className="block max-w-lg text-left">
                      <span className="text-gray-700 dark:text-gray-300">
                        Name
                      </span>
                      <br />
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        className="w-full p-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300"
                      ></input>
                    </label>
                    <label className="block max-w-lg mt-2 text-left">
                      <span className="text-gray-700 dark:text-gray-300">
                        Image (Optional)
                      </span>
                      <br />
                      <input
                        type="text"
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Enter image url"
                        className="w-full p-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300"
                      ></input>
                    </label>
                    <label className="block max-w-lg mt-2 text-left">
                      <span className="text-gray-700 dark:text-gray-300">
                        Cheeseometer
                      </span>
                      <select
                        className="block w-full mt-1 form-select"
                        onChange={(e) => setCheeseometer(e.target.value)}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </label>
                    <label className="block max-w-lg mt-2 text-left">
                      <span className="text-gray-700 dark:text-gray-300">
                        Deliverable
                      </span>
                      <select
                        className="block w-full mt-1 form-select"
                        onChange={(e) => setDeliverable(e.target.value)}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </label>
                    <label className="block max-w-lg mt-2 text-left">
                      <span className="text-gray-700 dark:text-gray-300">
                        Effort
                      </span>
                      <select
                        className="block w-full mt-1 form-select"
                        onChange={(e) => setEffort(e.target.value)}
                      >
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
                  className="p-2 px-5 m-3 mb-2 text-lg text-gray-100 bg-green-600 rounded-lg hover:ring-4 ring-green-400"
                  type="button"
                  onClick={() => saveFood()}
                >
                  Save food
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-gray-800 opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateFood;
