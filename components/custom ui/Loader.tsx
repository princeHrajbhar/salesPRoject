import React from 'react';

interface LoaderProps {
  message?: string;  // Optional message that can be displayed while loading
}

const Loader: React.FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 bg-opacity-70 backdrop-blur-sm">
      <div className="relative text-center">
        {/* Dotted ring loader with fewer larger dots */}
        <div className="relative inline-block w-20 h-20">
          <div className="absolute w-full h-full border-8 border-dotted border-black rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-dotted border-t-transparent border-l-transparent border-r-black border-b-transparent rounded-full animate-spin"></div>
        </div>

        {/* Message */}
        <p className="text-black text-xl mt-4 font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
