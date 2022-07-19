import type { ReactNode } from 'react';

const FormLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div className="relative mx-auto my-6 w-auto max-w-3xl">
        <div className="relative flex w-full flex-col rounded-lg border-0 bg-gray-50 shadow-lg outline-none focus:outline-none dark:bg-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
