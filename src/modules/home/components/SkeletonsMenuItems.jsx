import React from "react";
import { Card, Skeleton } from "@heroui/react";
const SkeletonsMenuItems = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Skeleton className=" rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="w-full h-48 " />
      </Skeleton>
      <Skeleton className=" rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="w-full h-48 " />
      </Skeleton>
      <Skeleton className=" rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="w-full h-48 " />
      </Skeleton>
      <Skeleton className=" rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="w-full h-48 " />
      </Skeleton>
      <Skeleton className=" rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="w-full h-48 " />
      </Skeleton>
      <Skeleton className=" rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="w-full h-48 " />
      </Skeleton>
      <Skeleton className=" rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="w-full h-48 " />
      </Skeleton>
      <Skeleton className=" rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="w-full h-48 " />
      </Skeleton>
    </div>
  );
};

export default SkeletonsMenuItems;
