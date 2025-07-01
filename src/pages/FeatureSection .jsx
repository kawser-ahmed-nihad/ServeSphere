import React from 'react';
import { Heart, Users, MapPin, Globe } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-orange-500" />,
      title: "Community Driven",
      description: "Events created and managed by people in your neighborhood.",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Collaborative Impact",
      description: "Join hands with others to make meaningful contributions.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-orange-500" />,
      title: "Location Based",
      description: "Find and join events near your local area instantly.",
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />, 
      title: "Global Reach",
      description: "Expand your initiatives beyond borders and inspire worldwide change.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-0 dark:bg-gray-800 dark:text-white ">
        <h2 className="text-3xl font-bold max-w-7xl mx-auto text-orange-500 mb-10">Why ServeSphere</h2>
      
      <div className=" max-w-7xl  mx-auto gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {features.map((feature, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="mb-4 flex justify-center ">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-300 ">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
