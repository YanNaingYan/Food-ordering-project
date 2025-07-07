import React from "react";
import { Star, Plus } from "lucide-react";
import { formatCurrency } from "../../../utils/currency";

const MenuItem = ({ item, onAddToCart, onItemClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div
        className="relative cursor-pointer"
        onClick={() => onItemClick(item)}
      >
        <img
          src={
            item.image ||
            "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          alt={item.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="cursor-pointer" onClick={() => onItemClick(item)}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors duration-200">
              {item.name}
            </h3>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(item.price)}
            </span>
          </div>

          {item.rating && (
            <div className="flex items-center mb-3">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
            </div>
          )}

          {item.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(item);
          }}
          disabled={!item.isAvailable}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
            item.isAvailable
              ? "bg-primary hover:bg-secondary text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Plus className="h-5 w-5" />
          <span>{item.isAvailable ? "Add to Cart" : "Unavailable"}</span>
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
