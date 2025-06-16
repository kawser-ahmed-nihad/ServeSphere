import React from 'react';
import { Heart, Users, MapPin } from 'lucide-react';

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
  ];

  return (
    <section className="py-16  dark:bg-black  dark:text-white bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-orange-500 mb-10">Why ServeSphere?</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
