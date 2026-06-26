import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ title, showAddButton, onAddClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
        <span className="bg-blue-500 text-white p-2 rounded-lg">👥</span>
        {title}
      </h1>
      <div className="flex gap-2">
        {showAddButton && (
          <button
            onClick={onAddClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
            + Add Employee
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
