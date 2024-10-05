"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
const texts = ["Innovating the Future", "Empowering Startups", "Building Creative Solutions"];

const Home: React.FC = () => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[index];
      setCurrentText(
        isDeleting ? fullText.substring(0, currentText.length - 1) : fullText.substring(0, currentText.length + 1)
      );

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
        setSpeed(100);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
        setSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, index, speed]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-white overflow-hidden">
      {/* Background Section with Parallax */}
      <div className={styles.parallax} style={{ backgroundImage: 'url(/background.png)' }}></div>

      {/* Text Animation Section */}
      <div className="relative z-10 text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span>{currentText}</span>
        </h1>
        <p className="text-lg md:text-2xl font-light">Unlock Potential, Create Impact</p>
      </div>

      {/* Image Grid with Hover Effects */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        <div className="transform transition-transform hover:scale-110">
          <Image src="/logo.png" alt="Innovation" width={150} height={150} className="rounded-lg shadow-lg" />
        </div>
        <div className="transform transition-transform hover:scale-110">
          <Image src="/logo.png" alt="Development" width={150} height={150} className="rounded-lg shadow-lg" />
        </div>
        <div className="transform transition-transform hover:scale-110">
          <Image src="/logo.png" alt="Growth" width={150} height={150} className="rounded-lg shadow-lg" />
        </div>
        <div className="transform transition-transform hover:scale-110">
          <Image src="/logo.png" alt="Success" width={150} height={150} className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
