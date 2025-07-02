import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const Contact = () => {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white">
      <Helmet>
        <title>ServeSphere || Contact</title>
      </Helmet>

      <div className="max-w-7xl mx-auto py-16 px-5 md:px-0">
        <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Info Section */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="p-4 rounded-full bg-orange-100 dark:bg-gray-900">
                <FaMapMarkerAlt className="text-orange-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Address</h4>
                <p>
                  Dhaka 102, 8000 Sent Behavior UTL<br />
                  Road 45, House 1216, Street Zone
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="p-4 rounded-full bg-orange-100 dark:bg-gray-900">
                <FaPhoneAlt className="text-orange-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p>
                  Phone: +32566 – 800 – 890<br />
                  Fax: 1234 – 58963 – 007
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="p-4 rounded-full bg-orange-100 dark:bg-gray-900">
                <FaEnvelope className="text-orange-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p>
                  support@servesphere.com<br />
                  info@servesphere.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <form className="dark:bg-gray-900 dark:text-white p-8 rounded shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name*"
                className="border border-gray-300 px-4 py-2 rounded w-full dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              />
              <input
                type="email"
                placeholder="Your Email*"
                className="border border-gray-300 px-4 py-2 rounded w-full dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Phone number*"
                className="border border-gray-300 px-4 py-2 rounded w-full dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Your website*"
                className="border border-gray-300 px-4 py-2 rounded w-full dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <textarea
              placeholder="Write your Message here*"
              className="w-full mt-4 border border-gray-300 px-4 py-2 rounded h-32 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
