import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Artify | My Favorites";
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const handleRemove = (id) => {
    if (!window.confirm("Are you sure you want to remove this artwork from favorites?")) return;
    const updated = favorites.filter((item) => item._id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-gray-900 dark:text-white">
          My Favorites
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          These are the artworks you've marked as favorite. You can remove any piece if you change your mind.
        </p>

        {favorites.length === 0 ? (
          <p className="text-gray-500 text-center dark:text-gray-400">
            No favorite artworks yet.{" "}
            <Link to="/explore" className="text-blue-500 dark:text-blue-400 underline">
              Explore Artworks
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((art) => (
              <div
                key={art._id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={art.imageURL}
                  alt={art.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4 flex flex-col justify-between min-h-[180px]">
               <div>
                    <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{art.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                 {art.artistName || "Unknown Artist"}
                    </p>
                  </div>
                  <button
             onClick={() => handleRemove(art._id)}
              className="mt-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Remove
             </button>
         </div>
              </div>
            ))}
          </div>
        )}

    <div className="text-center mt-10">
          <button
            onClick={() => navigate(-1)}
        className="px-6 py-2 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white rounded-lg hover:opacity-90 transition"
          >
         ← Back
          </button>
     </div>
      </div>
    </div>
  );
};

export default MyFavorites;
