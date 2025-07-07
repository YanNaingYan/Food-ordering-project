import React from "react";
import { Clock, Star, Truck } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-secondary to-primary text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Delicious Food
            <span className="block text-yellow-300">Delivered Fast</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto">
            Experience the finest cuisine from our kitchen to your table in just
            30 minutes
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-lg">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-yellow-300" />
              <span>30 min delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-300" />
              <span>4.8 average rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-yellow-300" />
              <span>Free delivery over $25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
