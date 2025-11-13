import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Artify | Explore Artworks";
  }, []);

  // Fetch only public artworks
  useEffect(() => {
    fetch("http://localhost:3000/artists?visibility=Public")
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artworks:", err);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    let result = artworks;

    if (search) {
      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(search.toLowerCase()) ||
          art.artistName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((art) => art.category === category);
    }

    setFiltered(result);
  }, [search, category, artworks]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-gray-700 text-lg animate-pulse">Loading Artworks...</p>
      </div>
    );

  return (
    <div className="pt-[72px] min-h-[calc(100vh-72px)] bg-white text-gray-900 px-6 py-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Explore Stunning Artworks</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Discover a collection of creative artworks from talented artists around the world. 
          Explore, search, and find inspiration across paintings, sketches, and digital designs.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <input
            type="text"
            placeholder="Search by title or artist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg w-full sm:w-80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg w-full sm:w-60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"  >
            <option value="">All Categories</option>
            <option value="Painting">Painting</option>
            <option value="Sketch">Sketch</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Photography">Photography</option>
          </select>
        </div>
  {filtered.length === 0 ? (
          <p className="text-gray-500 text-lg">No artworks found 😢</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.map((art) => (
              <div
                key={art._id}
                className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={art.imageURL}
                  alt={art.title}
                  className="w-full h-64 object-cover rounded-t-xl"/>
                <div className="p-5 text-left">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {art.title}
              </h3>
                  <p className="text-gray-600">{art.artistName}</p>
                  <p className="text-sm text-gray-500">{art.category}</p>
          <p className="mt-2 text-sm">❤️ {art.likes || 0} Likes</p>
                  <Link
                    to={`/artwork/${art._id}`}
                    className="mt-4 inline-block w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-2 rounded-lg text-center font-medium hover:bg-indigo-700 transition" >
         View Details
                  </Link>
            </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white px-6 py-2 rounded-lg hover:bg-gray-300 font-medium transition"
          >  ← Back
          </button>
    </div>
      </div>
    </div>
  );
};
export default Explore;
