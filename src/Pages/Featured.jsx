import React, { useEffect, useState } from "react";

const Featured = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/artists?limit=6")
      .then((res) => res.json())
      .then((data) => {
        const limitedData = data.slice(0, 6);
        setArtworks(limitedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artworks:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (artworks.length === 0) {
    return <p className="text-center py-10">No artworks available.</p>;
  }

  return (
    <div className="py-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Artworks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artworks.map((art) => (
          <div
            key={art._id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
 <img src={art.imageURL} alt={art.title} className="w-full h-64 object-cover" />
        <div className="p-4">
              <h3 className="text-xl font-semibold">{art.title}</h3>
              <p className="text-gray-500">{art.artistName}</p>
              <p className="text-sm mt-2">{art.category}</p>
   <button className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"> View Details
              </button>
       </div>
     </div>
      ))}
      </div>
    </div>
  );
};

export default Featured;
