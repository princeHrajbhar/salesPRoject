"use client"; // Ensures the page is rendered on the client side

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '@/animations/business2.json'; // Replace with your actual animation file

const TeamImpact = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-5">
      {/* Card container with rounded corners and no extra gap */}
      <div className="bg-gray-800 rounded-xl flex flex-col md:flex-row items-center justify-between w-full max-w-4xl">
        
        {/* Left Section: Animation */}
        <div className="w-full md:w-1/2 flex justify-center p-5">
          <div className="max-w-lg w-full">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>

        {/* Right Section: Team Impact Quote */}
        <div className="w-full md:w-1/2 text-center md:text-left p-5">
          <h1 className="text-4xl font-bold mb-6 leading-tight">Teamwork Makes the Dream Work</h1>
          <p className="text-xl">
            &quot;Alone we can do so little; together we can do so much.&quot;
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamImpact;
