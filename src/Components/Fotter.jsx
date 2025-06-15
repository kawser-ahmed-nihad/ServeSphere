import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
     
        <div>
          <h2 className="text-2xl font-bold text-orange-400 mb-2">ServeSphere</h2>
          <p className="text-gray-400">
            A community-driven platform connecting people with social service events in their area.
          </p>
        </div>

    
        <div>
          <h3 className="text-lg font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link to="/upcoming-events" className="hover:text-orange-400">Events</Link></li>
            <li><Link to="/create-event" className="hover:text-orange-400">Create Event</Link></li>
            <li><Link to="/login" className="hover:text-orange-400">Login</Link></li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-gray-400">Email: support@servesphere.com</p>
          <p className="text-gray-400">Phone: +880 1234-567890</p>
        </div>


        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-orange-400"><Facebook /></a>
            <a href="#" className="hover:text-orange-400"><Twitter /></a>
            <a href="#" className="hover:text-orange-400"><Instagram /></a>
            <a href="#" className="hover:text-orange-400"><Mail /></a>
          </div>
        </div>
      </div>

      
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ServeSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
