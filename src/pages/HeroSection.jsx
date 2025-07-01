import React from 'react';
import photo from '../assets/photo.jpg';

const HeroSection = () => {
  return (
    <div
      className="relative dark:bg-gray-800 dark:text-white w-full h-[400px] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${photo})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

      <div className="relative z-10 px-4 md:px-0 max-w-7xl w-full text-white text-left">
        <h5 className="text-orange-400 uppercase tracking-wider font-semibold mb-2">
          Welcome to our ServeSphere
        </h5>
        <h1 className="text-3xl md:text-5xl max-w-3xl font-bold mb-4">
          <span className="text-orange-500">Join hands,</span> create waves of positive change
        </h1>
        <p className="text-lg md:text-xl max-w-2xl">
          ServeSphere is a community-driven platform connecting people with local social
          development events. Join, create, and contribute to impactful initiatives that bring
          real change to your neighborhood.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
