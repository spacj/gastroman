import React from 'react';
export function ButtonPrimary({ className, children }) {
  return (
    <button
      className={`w-28 sm:w-32 md:w-40 lg:w-48 max-h-10 min-w-full min-h-full bg-blue-700 text-bodytxt-secondary  py-3 lg:py-5 px-5 lg:px-7 text-[11px] sm:text-xs md:text-lg font-semibold md:font-bold capitalize rounded-md shadow-md shadow-blue-600 flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
}
