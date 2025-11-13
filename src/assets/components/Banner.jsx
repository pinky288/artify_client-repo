import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const [artworks, setArtworks] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/artists")
      .then((res) => res.json())
      .then((data) => setArtworks(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % artworks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [artworks]);

  if (artworks.length === 0) return null;

  const current = artworks[index];

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const subVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  return (
    <div className="relative w-full h-[550px] overflow-hidden flex items-center bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 transition-all duration-700">
        <img
          src={current.imageURL}
          alt={current.title}
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
      <div className="relative z-10 w-1/2 pl-12 text-white space-y-4">
        <motion.h1
          className="text-4xl font-extrabold drop-shadow-lg"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          key={current.title + "title"}
        >
          <Typewriter
            words={[current.title]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.h1>

        <motion.p
          className="text-lg italic"
          variants={subVariants}
          initial="hidden"
          animate="visible"
          key={current.title + "artist"}
        >
          {current.artistName}
        </motion.p>

        <motion.p
          className="max-w-md opacity-90"
          variants={subVariants}
          initial="hidden"
          animate="visible"
          key={current.title + "desc"}
        >
          {current.description}
        </motion.p>

        <motion.button
          className="mt-3 bg-white text-black font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore More →
        </motion.button>
      </div>
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-1/2 overflow-hidden">
        <img
          src={current.imageURL}
          alt={current.title}
          className="w-[95%] h-[90%] rounded-2xl shadow-xl object-cover transition-all duration-700 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Banner;
