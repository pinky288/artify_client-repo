import React from "react";
import logo from "../logo.png";
import bg from "../bg.png";

const Footer = () => {
  return (
    <footer
      className="footer sm:footer-horizontal text-white font-semibold p-10"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <aside className="flex flex-col items-start">
        <div className="flex items-center mb-2">
          <img src={logo} alt="Artify Logo" className="w-12 h-12 mr-2" />
          <span className="text-2xl font-bold">Artify</span>
        </div>
        <p>
          A Creative Artwork Showcase Platform
          <br />
          Connecting artists and art lovers worldwide
        </p>
      </aside>

      <nav className="">
        <h6 className="footer-title ">Artworks</h6>
        <a className="link link-hover">Explore Artworks</a>
        <a className="link link-hover">Add Artwork</a>
        <a className="link link-hover">My Gallery</a>
        <a className="link link-hover">My Favorites</a>
      </nav>

      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Press kit</a>
      </nav>

      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of Use</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Cookie Policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
