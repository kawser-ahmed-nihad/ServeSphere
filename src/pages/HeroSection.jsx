import React from 'react';
import photo from '../assets/photo.jpg';

const HeroSection = () => {
  return (
    <div
      className="relative  dark:bg-black  dark:text-white w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${photo})`,
      }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>


     
      <div className="relative z-10 text-center text-white px-4">
        <h5 className="text-orange-400 uppercase tracking-wider font-semibold mb-2">
          Welcome to our ServeSphere
        </h5>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-orange-500">Join hands,</span> create waves of positive change
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          ServeSphere is a community-driven platform connecting people with local social
          development events. Join, create, and contribute to impactful initiatives that bring
          real change to your neighborhood.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
