import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { Tooltip } from 'react-tooltip';


const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const navLinkStyle = ({ isActive }) =>
    isActive ? 'text-orange-400 font-semibold' : 'hover:text-orange-400 font-medium';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-16 flex items-center px-10 justify-end backdrop-blur-md bg-black/20 z-50">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <nav className="backdrop-blur-md bg-black/20 text-white py-4 px-4 md:px-10 flex justify-between items-center fixed top-0 w-full z-50">
        <NavLink
          to="/"
          className="text-2xl font-bold text-orange-400 hidden md:block"
        >
          ServeSphere
        </NavLink>

        <div className="md:hidden">
          <Menu onClick={() => setIsMobileMenuOpen(true)} className="w-6 h-6 cursor-pointer text-orange-400 hover:scale-110 transition duration-200" />
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/upcoming-events" className={navLinkStyle}>Events</NavLink>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div>
                <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-orange-400 cursor-pointer"
                data-tooltip-id="user-tooltip"
                data-tooltip-content={user?.displayName}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              <Tooltip id="user-tooltip" place="bottom" style={{ backgroundColor: "#fb923c", color: "white" }} />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-xl z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-sm text-center text-orange-500">
                      {user.displayName}
                    </p>
                  </div>
                  <div className="flex flex-col px-4 py-2 space-y-1">
                    <NavLink to="/create-event" className="hover:text-orange-500 text-sm" onClick={() => setIsDropdownOpen(false)}>
                      Create Event
                    </NavLink>
                    <NavLink to="/manage-events" className="hover:text-orange-500 text-sm" onClick={() => setIsDropdownOpen(false)}>
                      Manage Events
                    </NavLink>
                    <NavLink to="/joined-events" className="hover:text-orange-500 text-sm" onClick={() => setIsDropdownOpen(false)}>
                      Joined Events
                    </NavLink>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="text-red-500 text-left hover:underline text-sm"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
