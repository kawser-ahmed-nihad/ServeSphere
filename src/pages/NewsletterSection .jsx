import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="py-16  dark:bg-black  dark:text-white bg-orange-50 text-center px-4">
      <h2 className="text-3xl font-bold text-orange-600 mb-4">Subscribe to our Newsletter</h2>
      <p className="text-gray-700 mb-8 max-w-xl mx-auto">
        Stay updated with the latest social service events, stories, and opportunities to contribute.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition">
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default NewsletterSection;
