import React, { useContext, useState } from 'react';
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

      {loading && (
        <div className="fixed top-0 right-40 z-[100] px-4 py-5">
          <div className="h-6 w-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

    
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/20 dark:bg-gray-800 text-black dark:text-white shadow-sm">
        <div className="flex max-w-7xl mx-auto justify-between items-center px-4 md:px-0 py-4">

        
          <NavLink to="/" className="text-2xl font-bold text-orange-500">ServeSphere</NavLink>

          <div className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2 text-sm font-medium">
            <NavLink to="/upcoming-events" className={navLinkStyle}>Events</NavLink>
            <NavLink to="/create-event" className={navLinkStyle}>Create Event</NavLink>
            <NavLink to="/manage-events" className={navLinkStyle}>Manage Events</NavLink>
            <NavLink to="/joined-events" className={navLinkStyle}>Joined Events</NavLink>
            <NavLink to="/contact" className={navLinkStyle}>Contact</NavLink>
          </div>

    
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Theme">
              {darkMode ? <Sun className="w-6 h-6 text-orange-400" /> : <Moon className="w-6 h-6 text-orange-400" />}
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

         
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="w-6 h-6 text-orange-400" /> : <Moon className="w-6 h-6 text-orange-400" />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-orange-400" />
            </button>
          </div>
        </div>
      </nav>

    
      <div className={`fixed inset-0 z-50 transition duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
     
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-gray-800/50"

          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

       
        <div className="absolute right-0 top-0 h-full w-72 sm:w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-orange-500">ServeSphere</h2>
            <X className="w-6 h-6 text-orange-400 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
          </div>

          <div className="flex flex-col px-6 py-6 space-y-4 text-base font-medium">
            <NavLink to="/upcoming-events" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Events</NavLink>
            <NavLink to="/create-event" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Create Event</NavLink>
            <NavLink to="/manage-events" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Manage Events</NavLink>
            <NavLink to="/joined-events" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Joined Events</NavLink>
            <NavLink to="/contact" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>

            <hr className="border-t border-gray-300 dark:border-gray-700 my-3" />

            {user ? (
              <>
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{user.displayName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
