import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
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
        const limitedData = data.slice(0, 6);
        setArtworks(limitedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (artworks.length === 0) return <p className="text-center py-10">No artworks available.</p>;

  return (
    <div className="px-6 py-10 space-y-20">
      
      <Fade cascade triggerOnce>
        <section className="bg-gray-50 py-10 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-2 text-center">Featured Artworks</h2>
          <p className="text-center text-gray-600 mb-8">
            Discover our curated selection of trending artworks from talented artists worldwide.
          </p>
          <div className="flex justify-center mb-8">
            <span className="w-24 h-1 bg-blue-500 rounded-full"></span>
     </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artworks.map((art) => (
              <div key={art._id} className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-xl transition transform hover:-translate-y-1">
             <img src={art.imageURL} alt={art.title} className="w-full h-64 object-cover" />
                <div className="p-4 flex flex-col justify-between h-52">
               <div>
                  <h3 className="text-xl font-semibold">{art.title}</h3>
                 <p className="text-gray-500">{art.artistName}</p>
                    <p className="text-sm mt-1 text-gray-400">{art.category}</p>
                  </div>
                  <button className="mt-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                   View Details
                  </button>
             </div>
              </div>
            ))}
          </div>
        </section>
      </Fade>

      <Fade cascade triggerOnce>
        <section className="bg-white py-10 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-2 text-center">Top Artists of the Week</h2>
        <p className="text-center text-gray-600 mb-8">
            Meet the most active and popular artists this week in our community.
         </p>
          <div className="flex justify-center mb-8">
            <span className="w-24 h-1 bg-green-500 rounded-full"></span>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topArtists.map((artist, idx) => (
              <div key={idx} className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center">
            <img src={artist.img} alt={artist.name} className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-gray-200" />
                <h3 className="text-xl font-semibold">{artist.name}</h3>
               <p className="text-gray-500">{artist.artworks} Artworks</p>
              </div>
            ))}
          </div>
        </section>
      </Fade>

      <Fade cascade triggerOnce>
        <section className="bg-gray-100 py-10 rounded-lg shadow-md">
         <h2 className="text-3xl font-bold mb-2 text-center">Community Highlights</h2>
          <p className="text-center text-gray-600 mb-8">
           Explore standout pieces shared by our global artist community.
          </p>
          <div className="flex justify-center mb-8">
            <span className="w-24 h-1 bg-pink-500 rounded-full"></span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {communityHighlights.map((art, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1">
                <img src={art.img} alt={art.title} className="w-full h-52 object-cover" />
            <div className="p-6">
                  <h3 className="text-xl font-semibold">{art.title}</h3>
                 <p className="text-gray-500">{art.artist}</p>
                <p className="text-sm mt-1 text-gray-400">{art.category}</p>
                </div>
              </div>
         ))}
          </div>
        </section>
      </Fade>

    </div>
  );
};

export default Featured;
