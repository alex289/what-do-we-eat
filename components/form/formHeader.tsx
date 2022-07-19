const FormHeader = ({
  title,
  exit,
}: {
  title: string;
  exit: (arg: boolean) => void;
}) => {
  return (
    <div className="border-blueGray-200 mx-16 flex items-start justify-between rounded-t border-b border-solid p-5">
      <h3 className="mr-4 text-3xl font-semibold">{title}</h3>
      <button
        className="float-right ml-4 border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
        type="button"
        onClick={() => exit(false)}>
        <span className="block h-6 w-6 text-2xl text-black outline-none hover:text-gray-800 focus:outline-none dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
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
