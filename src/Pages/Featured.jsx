import React, { useEffect, useState } from "react";
import yayoi from "../assets/yayoi-kusama.jpg";
import banksy from "../assets/Banksy-Jr.webp";
import basquiat from "../assets/Jean-Michel.jpg";

const topArtists = [
  { name: "Yayoi Kusama", artworks: 4, img: yayoi },
  { name: "Banksy Jr.", artworks: 3, img: banksy },
  { name: "Jean-Michel Basquiat", artworks: 2, img: basquiat },
];
const communityHighlights = [
  {
    title: "Infinity Dots",
    artist: "Yayoi Kusama",
    category: "Contemporary / Installation",
    img: yayoi,
  },
  {
    title: "Street Graffiti",
    artist: "Banksy Jr.",
    category: "Street Art / Political",
    img: banksy,
  },
  {
    title: "Crown Skull",
    artist: "Jean-Michel Basquiat",
    category: "Neo-Expressionism",
    img: basquiat,
  },
];

const Featured = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch("http://localhost:3000/artists?limit=6")
      .then((res) => res.json())
      .then((data) => {
      
        const sortedData = data.sort((a, b) => (a._id < b._id ? 1 : -1));
        setArtworks(sortedData.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artworks:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (!artworks.length)
    return <p className="text-center py-10 text-gray-500">No artworks available.</p>;

  return (
    <div className="px-6 py-10 space-y-20">
      <section className="bg-gray-50 py-10 px-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center relative inline-block">
          Featured Artworks
          <span className="absolute left-1/2 -bottom-2 w-24 h-1 bg-blue-500 transform -translate-x-1/2 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-xl transition flex flex-col"
            >
            <img src={art.imageURL} alt={art.title} className="w-full h-64 object-cover"/>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{art.title}</h3>
                  <p className="text-gray-500">{art.artistName}</p>
                  <p className="text-sm mt-1 text-gray-400">{art.category}</p>
                </div>
                <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                  View Details </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-10 px-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center relative inline-block">
          Top Artists of the Week
          <span className="absolute left-1/2 -bottom-2 w-24 h-1 bg-green-500 transform -translate-x-1/2 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topArtists.map((artist, idx) => (
            <div key={idx} className="border rounded-lg p-4 shadow hover:shadow-lg transition text-center">
              <img src={artist.img} alt={artist.name} className="w-24 h-24 mx-auto rounded-full object-cover mb-3"/>
              <h3 className="text-xl font-semibold">{artist.name}</h3>
              <p className="text-gray-500">{artist.artworks} Artworks</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gray-100 py-10 px-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center relative inline-block">
          Community Highlights
          <span className="absolute left-1/2 -bottom-2 w-24 h-1 bg-pink-500 transform -translate-x-1/2 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {communityHighlights.map((art, idx) => (
            <div
              key={idx}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
        <img src={art.img} alt={art.title} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{art.title}</h3>
                <p className="text-gray-500">{art.artist}</p>
                <p className="text-sm mt-1 text-gray-400">{art.category}</p>
              </div>
            </div>
     ))}
     </div>
    </section>
    </div>
);
};

export default Featured;
