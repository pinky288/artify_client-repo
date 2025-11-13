import React from "react";
import logo from "../logo.png";
import bg from "../bg.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si";

const Footer = () => {
  return (
    <footer
      className="text-white font-semibold py-12 px-6 sm:px-12"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
     
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-4">
            <img src={logo} alt="Artify Logo" className="w-12 h-12 mr-2" />
            <span className="text-2xl font-bold tracking-wide">Artify</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            A Creative Artwork Showcase Platform <br />
            Connecting artists and art lovers worldwide.
          </p>
          <div className="flex space-x-4 mt-5 text-xl">
            <a
              href="#"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
              aria-label="X"
            >
              <SiX />
            </a>
            <a
              href="#"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      
        <div>
          <h6 className="text-lg font-bold mb-4 border-l-4 border-pink-400 pl-3">
            Artworks
          </h6>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition">Explore Artworks</a></li>
            <li><a href="#" className="hover:text-white transition">Add Artwork</a></li>
            <li><a href="#" className="hover:text-white transition">My Gallery</a></li>
            <li><a href="#" className="hover:text-white transition">My Favorites</a></li>
          </ul>
        </div>

    
        <div>
          <h6 className="text-lg font-bold mb-4 border-l-4 border-green-400 pl-3">
            Company
          </h6>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Press Kit</a></li>
          </ul>
        </div>


        <div>
          <h6 className="text-lg font-bold mb-4 border-l-4 border-yellow-400 pl-3">
            Legal
          </h6>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

     
      <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">Artify</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
