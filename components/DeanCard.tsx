"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa"; // Import social media icons

type Dean = {
  name: string;
  position: string;
  description: string;
  imageUrl: string;
};

const deans: Dean[] = [
  {
    name: "Dr. John Smith",
    position: "Dean of Engineering",
    description:
      "Dr. Smith has over 20 years of experience in engineering education.",
    imageUrl:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Dr. Alice Johnson",
    position: "Dean of Science",
    description:
      "Dr. Johnson specializes in research and development in molecular biology.",
    imageUrl:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Dr. Robert Lee",
    position: "Dean of Business",
    description:
      "Dr. Lee is an expert in international business and entrepreneurship.",
    imageUrl:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const DeanCard: React.FC = () => {
  const [currentDeanIndex, setCurrentDeanIndex] = useState(0);

  // Switch to the next dean every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDeanIndex((prevIndex) => (prevIndex + 1) % deans.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentDean = deans[currentDeanIndex];

  return (
    <div className="dean-card-container flex justify-center items-center bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="dean-card w-full max-w-5xl bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white shadow-2xl rounded-xl overflow-hidden transition-transform duration-300 transform hover:scale-105">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-10">
          {/* Left - Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-52 h-52">
              <Image
                src={currentDean.imageUrl}
                alt={currentDean.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow-lg transition-all duration-300 hover:opacity-90"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-extrabold mb-4">{currentDean.name}</h2>
            <h3 className="text-3xl font-semibold text-gray-400 mb-6">
              {currentDean.position}
            </h3>
            <p className="text-lg leading-relaxed text-gray-300 mb-6">
              {currentDean.description}
            </p>

            {/* Social media icons */}
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200 relative"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
                <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 transition-opacity duration-200 hover:opacity-100">
                  LinkedIn
                </span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200 relative"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
                <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 transition-opacity duration-200 hover:opacity-100">
                  Twitter
                </span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200 relative"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
                <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 transition-opacity duration-200 hover:opacity-100">
                  Facebook
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MeetOurDeans: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-bold text-white mb-6">Meet Our Deans</h1>
      <div className="flex-grow flex items-center justify-center">
        <DeanCard />
      </div>
    </div>
  );
};

export default MeetOurDeans;
