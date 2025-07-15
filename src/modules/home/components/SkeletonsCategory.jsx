import { Skeleton } from "@heroui/react";
import React from "react";

const SkeletonsCategory = () => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 py-4 overflow-x-auto scrollbar-hide">
          <button
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 bg-primary text-white `}
          >
            All
          </button>
          <Skeleton className=" w-20 py-2 rounded-full" />
          <Skeleton className=" w-20 py-2 rounded-full" />
          <Skeleton className=" w-20 py-2 rounded-full" />
          <Skeleton className=" w-20 py-2 rounded-full" />
          <Skeleton className=" w-20 py-2 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonsCategory;
