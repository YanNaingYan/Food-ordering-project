import React from "react";
import { ShoppingCart, Search, Menu as MenuIcon, User2 } from "lucide-react";
import { formatCurrency } from "../../../utils/currency";
import { Dropdown, User } from "@heroui/react";
import {
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
const Header = ({
  cart,
  searchQuery,
  onSearchChange,
  onCartClick,
  profileData,
  onProfileClick,
  onorderHistoryClick,
}) => {
  const handleSignout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Food World</h1>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Cart Button and profile*/}
          <div className="flex  justify-end items-center">
            <button
              type="button"
              onClick={onCartClick}
              className="relative flex items-center space-x-2 bg-primary hover:bg-secondary  text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">
                {formatCurrency(cart.total)}
              </span>
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 border border-white bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </button>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="white" className="   ">
                  {profileData?.profilePicture ? (
                    <img src={profileData?.profilePicture} />
                  ) : (
                    <div className=" ">
                      <User className=" " />
                    </div>
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="viewProfile" onClick={onProfileClick}>
                  View Profile
                </DropdownItem>
                <DropdownItem key="orderHistory" onClick={onorderHistoryClick}>
                  Order History
                </DropdownItem>

                <DropdownItem
                  key="signOut"
                  className="text-danger"
                  color="danger"
                  onClick={handleSignout}
                >
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
