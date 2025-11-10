import React, { useEffect, useState } from "react";

const Explore = () => {
  const [artworks, setArtworks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/artists")
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

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Explore Artworks</h2>

     
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or artist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Painting">Painting</option>
          <option value="Sketch">Sketch</option>
          <option value="Digital Art">Digital Art</option>
          <option value="Photography">Photography</option>
        </select>
      </div>

      
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No artworks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <div
              key={art._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <img
                src={art.imageURL}
                alt={art.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{art.title}</h3>
                <p className="text-gray-600">{art.artistName}</p>
                <p className="text-sm text-gray-500">{art.category}</p>
                <p className="mt-2 text-sm">❤️ {art.likes || 0} Likes</p>
                <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            View Details
          </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
