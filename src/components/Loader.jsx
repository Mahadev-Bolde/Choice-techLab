import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="h-15 w-15 rounded-full border-4 border-gray-300  border-t-blue-500 animate-spin"></div>
    </div>
  );
};

export default Loader;
