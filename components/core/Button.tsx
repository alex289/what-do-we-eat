type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="mx-3 mb-2 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 dark:bg-violet-700 hover:dark:bg-violet-900">
      {children}
    </button>
  );
};

export default Button;
