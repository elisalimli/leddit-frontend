import React from "react";

export interface WrapperProps {
  mobileFull?: Boolean;
}

const Wrapper: React.FC<WrapperProps> = ({ children, mobileFull = false }) => {
  return (
    <div
      className={`font-roboto min-h-screen bg-gray-100
       dark:bg-gray-dark transition-colors duration-500  dark:text-white ${
         mobileFull ? "p-2" : "p-12"
       }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
