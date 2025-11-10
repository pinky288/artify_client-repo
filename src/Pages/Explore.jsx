import React, { useEffect, useState } from "react";

const Explore = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/artists")
      .then(res => res.json())
      .then(data => setArtworks(data))
      .catch(err => console.error("Error fetching artworks:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Artworks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.map(art => (
          <div key={art._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition">
            <img src={art.imageURL} alt={art.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h2 className="font-semibold text-lg">{art.title}</h2>
              <p className="text-gray-600 text-sm">{art.artistName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
