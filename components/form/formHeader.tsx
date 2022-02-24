const FormHeader = ({
  title,
  exit,
}: {
  title: string;
  exit: (arg: boolean) => void;
}) => {
  return (
    <div className="flex items-start justify-between p-5 mx-16 border-b border-solid rounded-t border-blueGray-200">
      <h3 className="mr-4 text-3xl font-semibold">{title}</h3>
      <button
        className="float-right p-1 ml-4 text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
        type="button"
        onClick={() => exit(false)}
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
  );
};

export default FormHeader;
