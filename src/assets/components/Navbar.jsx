import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../logo.png";
import { useTheme } from "./ThemeProvider";

const Navbar = ({ user: parentUser }) => {
  const [user, setUser] = useState(parentUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (!currentUser.photoURL) {
          updateProfile(currentUser, {
            photoURL: "https://i.ibb.co/RkYhnY2c/profile-pic.jpg",
          }).catch(console.error);
        }
        setUser({ ...currentUser });
      } else setUser(null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50 px-6 md:px-12 lg:px-16 py-3 md:py-4 backdrop-blur-md bg-white/50 dark:bg-gray-800 shadow-md flex items-center justify-between transition-colors duration-300">
      
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Artify Logo" className="w-12 h-12" />
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-wide">
          Artify
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-6 font-medium text-gray-800 dark:text-gray-100">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        {user && <Link to="/add-artwork">Add Artwork</Link>}
        {user && <Link to="/my-gallery">My Gallery</Link>}
        {user && <Link to="/my-favorites">Favorites</Link>}
        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
      <div className="hidden md:flex items-center space-x-4 font-medium">
        {!user ? (
          <>
            <Link to="/login" className="px-5 py-2 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white rounded-lg">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white rounded-lg">
              Register
            </Link>
          </>
        ) : (
          <div className="relative group">
            <img
              src={user.photoURL || logo}
              alt={user.displayName || "User"}
              className="w-12 h-12 rounded-full cursor-pointer border-2 border-white shadow-md"
            />
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="px-4 py-2 font-medium truncate">{user.displayName || "User"}</p>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-600 text-red-500 dark:text-red-400 font-semibold transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800 dark:text-gray-200 focus:outline-none">
          {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md md:hidden flex flex-col space-y-2 p-4 transition-colors duration-300">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/explore" onClick={() => setMenuOpen(false)}>Explore</Link>
          {user && <Link to="/add-artwork" onClick={() => setMenuOpen(false)}>Add Artwork</Link>}
          {user && <Link to="/my-gallery" onClick={() => setMenuOpen(false)}>My Gallery</Link>}
          {user && <Link to="/my-favorites" onClick={() => setMenuOpen(false)}>Favorites</Link>}

          <button
            onClick={() => { toggleTheme(); setMenuOpen(false); }}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md mt-2 font-medium"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-2 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white rounded-lg">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-2 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white rounded-lg">Register</Link>
            </>
          ) : (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="px-4 py-2 bg-red-500 text-white rounded-lg mt-2 font-semibold">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
