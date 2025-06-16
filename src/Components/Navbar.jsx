import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import { DarkModeContext } from '../Context/DarkModeProvider';

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? 'text-orange-400 font-semibold'
      : 'hover:text-orange-400 dark:hover:text-orange-300 font-medium';

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

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire("Logged out!", "", "success");
      }
    });
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-16 flex items-center px-10 justify-end backdrop-blur-md bg-black/20 z-50">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
   
      <nav className="backdrop-blur-md bg-white/20 dark:bg-black/20 text-black dark:text-white py-4 px-4 md:px-20 flex justify-between items-center fixed top-0 w-full z-50">
        <NavLink
          to="/"
          className="text-2xl font-bold text-orange-400"
        >
          ServeSphere
        </NavLink>

      
        <div className="md:hidden flex gap-4 items-center">
          <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Theme" className="text-orange-400">
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          <Menu onClick={() => setIsMobileMenuOpen(true)} className="w-6 h-6 cursor-pointer text-orange-400 hover:scale-110 transition duration-200" />
        </div>

    
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/upcoming-events" className={navLinkStyle}>Events</NavLink>

          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-orange-400 hover:scale-110 transition"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>

          {user ? (
            <button
              onClick={handleLogOut}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              Login
            </NavLink>
          )}

          
          {user && (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-orange-400 cursor-pointer"
                data-tooltip-id="user-tooltip"
                data-tooltip-content={user?.displayName}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              <Tooltip id="user-tooltip" place="bottom" style={{ backgroundColor: "#fb923c", color: "white" }} />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1f1f1f] text-black dark:text-white rounded-lg shadow-xl z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b dark:border-gray-700">
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
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

     
      <div className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-[#1f1f1f] text-black dark:text-white z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-orange-400">ServeSphere</h2>
          <X onClick={() => setIsMobileMenuOpen(false)} className="w-6 h-6 cursor-pointer text-orange-400" />
        </div>

        <div className="flex flex-col space-y-4 px-6 py-6">
          <NavLink to="/upcoming-events" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Events</NavLink>

          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setIsMobileMenuOpen(false);
            }}
            className="text-orange-400 flex items-center gap-2"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {user ? (
            <>
              <NavLink to="/create-event" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Create Event</NavLink>
              <NavLink to="/manage-events" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Manage Events</NavLink>
              <NavLink to="/joined-events" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Joined Events</NavLink>
              <button onClick={() => { handleLogOut(); setIsMobileMenuOpen(false); }} className="text-red-500 text-left hover:underline">Logout</button>
            </>
          ) : (
            <NavLink to="/login" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition" onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
