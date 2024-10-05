"use client"; // Ensures the page is rendered on the client side

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '@/animations/buisness.json'; // Replace with your actual animation file

const BusinessIdea = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-5">
      {/* Card container with rounded corners, elevation, and adjusted margin */}
      <div className="bg-gray-800 rounded-xl shadow-lg m-2 p-10 flex flex-col md:flex-row items-center justify-between max-w-4xl w-full">
        
        {/* Left Section: Motivational Sentences */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl font-bold mb-6 leading-tight">Dream Big. Think Bigger.</h1>
          <p className="text-xl mb-4">
            &quot;The best way to predict the future is to create it.&quot;
          </p>
          <p className="text-xl">
            &quot;Success is not the key to happiness. Happiness is the key to success.&quot;
          </p>
        </div>

        {/* Right Section: Animation */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="max-w-lg w-full">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessIdea;
