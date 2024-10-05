"use client"
import React from 'react';
import Home from '@/components/Home'
import Anime1 from '@/components/Hero1Anime'
import ReelAid from '@/components/AppleCardsCarouselDemo'
import Anime2 from '@/components/Hero2Anime'

const HomePage = () => {
  return (
    <div>
      <Home/>
      <Anime1/>
      <Anime2/>
      <ReelAid/>

    </div>
  );
};

export default HomePage;
