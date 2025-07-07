import React, { useState } from "react";
import {
  X,
  Star,
  Clock,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";
import { formatCurrency } from "../../../utils/currency";

const MenuItemDetail = ({ item, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const images = item.images || [
    item.image ||
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    onAddToCart(item, quantity, specialInstructions || undefined);
    onClose();
  };

  const getSpiceLevelColor = (level) => {
    switch (level) {
      case "mild":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "hot":
        return "text-primary";
      case "extra-hot":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getSpiceLevelText = (level) => {
    return level
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={images[currentImageIndex]}
                    alt={item.name}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all duration-200"
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all duration-200"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex
                            ? "border-primary"
                            : "border-gray-200"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${item.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Item Details */}
              <div className="space-y-6">
                {/* Price and Rating */}
                <div className="flex justify-between items-start">
                  <div className="text-3xl font-bold text-primary">
                    {formatCurrency(item.price)}
                  </div>
                  <div className="flex items-center space-x-4">
                    {item.rating && (
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-lg font-medium">
                          {item.rating}
                        </span>
                      </div>
                    )}
                    {item.prepTime && (
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-1" />
                        <span>{item.prepTime} min</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Spice Level */}
                {item.spiceLevel && (
                  <div className="flex items-center space-x-2">
                    <Flame
                      className={`h-5 w-5 ${getSpiceLevelColor(
                        item.spiceLevel
                      )}`}
                    />
                    <span
                      className={`font-medium ${getSpiceLevelColor(
                        item.spiceLevel
                      )}`}
                    >
                      {getSpiceLevelText(item.spiceLevel)}
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.description}
                </p>

                {/* Ingredients */}
                {item.ingredients && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Allergens */}
                {item.allergens && item.allergens.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Allergens
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.allergens.map((allergen, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nutrition Info */}
                {item.nutritionInfo && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Nutrition Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">
                          {item.calories}
                        </div>
                        <div className="text-sm text-gray-600">Calories</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-500">
                          {item.nutritionInfo.protein}g
                        </div>
                        <div className="text-sm text-gray-600">Protein</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-500">
                          {item.nutritionInfo.carbs}g
                        </div>
                        <div className="text-sm text-gray-600">Carbs</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-500">
                          {item.nutritionInfo.fat}g
                        </div>
                        <div className="text-sm text-gray-600">Fat</div>
                      </div>
                    </div>
                  </div>
                )}
                {item.calories && (
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">
                          {item.calories}
                        </div>
                        <div className="text-sm text-gray-600">Calories</div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Special Instructions */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Special Instructions (Optional)
                  </h4>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests or modifications..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      Quantity
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      >
                        <Minus className="h-5 w-5 text-gray-600" />
                      </button>
                      <span className="w-12 text-center font-semibold text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      >
                        <Plus className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={!item.isAvailable}
                    className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                      item.isAvailable
                        ? "bg-primary hover:bg-secondary text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Plus className="h-6 w-6" />
                    <span>
                      {item.isAvailable
                        ? `Add ${quantity} to Cart - ${formatCurrency(
                            item.price * quantity
                          )}`
                        : "Unavailable"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;
