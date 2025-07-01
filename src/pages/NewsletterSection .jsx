import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="py-16 px-4 md:px-0 dark:bg-gray-800 dark:text-white text-left">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">Subscribe to our Newsletter</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Stay updated with the latest social service events, stories, and opportunities to contribute.
        </p>

        <form className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
