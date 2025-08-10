import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
     
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-4">ServeSphere</h2>
          <p className="text-sm leading-relaxed">
            A community-driven platform connecting people with social service events near them. Empowering change, one event at a time.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-500">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
            <li><Link to="/upcoming-events" className="hover:text-orange-400 transition">Events</Link></li>
            <li><Link to="/create-event" className="hover:text-orange-400 transition">Create Event</Link></li>
            <li><Link to="/login" className="hover:text-orange-400 transition">Login</Link></li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-500">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:support@servesphere.com" className="hover:text-orange-400 transition">support@servesphere.com</a></li>
            <li>Phone: <a href="tel:+8801234567890" className="hover:text-orange-400 transition">+880 1234-567890</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-500">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-400 transition"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-orange-400 transition"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-orange-400 transition"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-orange-400 transition"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

     
      <div className="mt-12 pt-6 border-t border-gray-300 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} <span className="text-orange-500 font-semibold">ServeSphere</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
