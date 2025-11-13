import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[70vh] bg-transparent">
      <div className="relative w-16 h-16">   
        <div className="absolute inset-0 border-4 border-t-transparent border-r-blue-500 border-b-pink-500 border-l-green-500 rounded-full animate-spin"></div>

      
        <div className="absolute inset-3 border-4 border-gray-200 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
         </div>
  );
};

export default Loader;
