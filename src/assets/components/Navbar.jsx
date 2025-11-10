import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import bg from "../bg.png";

const Navbar = ({ user }) => {
  return (
    <nav className="relative shadow-md px-6 py-4 flex items-center justify-between text-white"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Artify Logo" className="w-12 h-12 mr-2" />
          <span className="text-2xl font-bold">Artify</span>
        </Link>
      </div>

      <div className="flex space-x-6 font-semibold">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/explore" className="hover:underline">Explore Artworks</Link>
        <Link to="/add-artwork" className="hover:underline">Add Artwork</Link>
        <Link to="/my-gallery" className="hover:underline">My Gallery</Link>
        <Link to="/favorites" className="hover:underline">My Favorites</Link>
      </div>

      <div className="flex items-center font-semibold space-x-4 ">
        {!user ? (
          <>
            <Link to="/login" className="bg-white text-black px-4 py-1 rounded hover:bg-gray-100">Login</Link>
            <Link to="/register" className="bg-white text-black px-4 py-1 rounded hover:bg-gray-100">Register</Link></>
        ) : (
          <div className="relative group">
     <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full cursor-pointer"/>
    <div className="absolute right-0 mt-2 w-32 bg-white text-black border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="px-4 py-2">{user.displayName}</p>
              <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500">Logout</button>
            </div>
       </div>
    )}
     </div>
    </nav>
 );
};

export default Navbar;
