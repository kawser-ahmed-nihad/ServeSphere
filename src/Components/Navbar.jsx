import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { DarkModeContext } from '../Context/DarkModeProvider';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  

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
        setIsMobileMenuOpen(false);
      }
    });
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
    ? 'text-orange-500 dark:text-orange-400 underline underline-offset-4 font-semibold'
    : 'hover:text-orange-500 dark:hover:text-orange-400';


  return (
    <>
      {/* Global Loading Spinner */}
      {loading && (
        <div className="fixed top-0 right-40 z-[100] px-4 py-5">
          <div className="h-6 w-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className=" fixed top-0 w-full z-50 backdrop-blur-md bg-white/20 dark:bg-gray-800 text-black dark:text-white shadow-sm">
        <div className="flex max-w-7xl mx-auto justify-between items-center  px-4 md:px-0 py-4 transition-all duration-300">

          {/* Left - Logo */}
          <NavLink to="/" className="text-2xl font-bold text-orange-500">ServeSphere</NavLink>

          {/* Center - NavLinks */}
          <div className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2 text-sm font-medium transition-all duration-300">
            <NavLink to="/upcoming-events" className={navLinkStyle}>Events</NavLink>
            <NavLink to="/create-event" className={navLinkStyle}>Create</NavLink>
            <NavLink to="/manage-events" className={navLinkStyle}>Manage</NavLink>
            <NavLink to="/joined-events" className={navLinkStyle}>Joined</NavLink>
          </div>

          {/* Right - Theme, User, Auth */}
          <div className="hidden md:flex items-center gap-4 transition-all duration-300">
            <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Theme">
              {darkMode
                ? <Sun className="w-6 h-6 text-orange-400" />
                : <Moon className="w-6 h-6 text-orange-400" />}
            </button>

            {user ? (
              <>

                <img
                  src={user.photoURL}
                  alt="User"
                  title={user.displayName}
                  className="w-9 h-9 rounded-full border-2 border-orange-500 object-cover"
                 
                />

                <button
                  onClick={handleLogOut}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode
                ? <Sun className="w-6 h-6 text-orange-400" />
                : <Moon className="w-6 h-6 text-orange-400" />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-orange-400" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Slide Right to Left */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-[#1f1f1f] text-black dark:text-white z-50 shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center px-4 py-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold text-orange-500">ServeSphere</h2>
          <X className="w-6 h-6 text-orange-400 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
        </div>

        <div className="flex flex-col px-6 py-6 space-y-4 text-base">
          <NavLink to="/upcoming-events" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Events</NavLink>
          <NavLink to="/create-event" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Create Event</NavLink>
          <NavLink to="/manage-events" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Manage Events</NavLink>
          <NavLink to="/joined-events" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Joined Events</NavLink>

          {user ? (
            <>
              <div className="flex items-center gap-2">

                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-9 h-9 rounded-full border-2 border-orange-500 object-cover"
                />

                <span className="text-sm">{user.displayName}</span>
              </div>
              <button onClick={handleLogOut} className="text-red-500 text-left">Logout</button>
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
