import React from "react";

const MenuCategories = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 py-4 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => onCategorySelect("All")}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === "All"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategorySelect(category?.name)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category?.name
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category?.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCategories;
