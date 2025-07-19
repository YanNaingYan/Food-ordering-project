import React from "react";
import { X, Plus, Minus, ShoppingBag, User } from "lucide-react";
import { formatCurrency } from "../../../utils/currency";

const ProfileDetail = ({ isOpen, profileData, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        {/* Header */}
        <div className="flex flex-col ">
          <div className="flex items-center justify-end p-6 ">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <div className="my-2">
            {" "}
            {profileData?.profilePicture ? (
              <img
                src={profileData?.profilePicture}
                className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <User className="w-12 h-12 text-gray-800" />
              </div>
            )}
          </div>

          <h1 className="text-center text-2xl">{profileData?.name}</h1>
          <h1 className="text-center text-lg text-gray-500">
            {profileData?.email}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
