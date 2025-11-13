import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../assets/components/Loader";

const ArtworkDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [localLikes, setLocalLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    document.title = "Artify | Artwork Details";
    const unsub = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/artists/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);
        setLocalLikes(data.likes || 0);
        const storedLikes = JSON.parse(localStorage.getItem("likedArtworks")) || [];
        if (storedLikes.includes(data._id)) setLiked(true);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!artwork) return <p className="text-center mt-10 text-white">Artwork not found!</p>;
  const handleAddFavorite = () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    if (stored.find((item) => item._id === artwork._id)) {
      toast.info("Already in favorites!");
      return;
    }
    stored.push(artwork);
    localStorage.setItem("favorites", JSON.stringify(stored));
    toast.success("Added to favorites!");
  };
  const handleLike = () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    const storedLikes = JSON.parse(localStorage.getItem("likedArtworks")) || [];

    if (liked) {
      setLocalLikes(prev => prev - 1);
      setLiked(false);
      localStorage.setItem(
        "likedArtworks",
        JSON.stringify(storedLikes.filter(id => id !== artwork._id))
      );
    } else {
      setLocalLikes(prev => prev + 1);
      setLiked(true);
      localStorage.setItem(
        "likedArtworks",
        JSON.stringify([...storedLikes, artwork._id])
      );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <img src={artwork.imageURL} alt={artwork.title} className="w-full rounded-lg shadow-lg mb-8" />
        <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
        <p className="text-gray-600 mb-2"><strong>Artist:</strong> {artwork.artistName}</p>
        <p className="text-gray-600 mb-2"><strong>Category:</strong> {artwork.category}</p>
        <p className="text-gray-600 mb-2"><strong>Medium:</strong> {artwork.medium}</p>
        <p className="text-gray-700 mt-4 mb-6">{artwork.description}</p>
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleAddFavorite}
            className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Add to Favorites
          </button>

          <button
            onClick={handleLike}
            className={`px-6 py-2 rounded-lg text-white transition ${
              liked ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            ❤️ {localLikes}
          </button>
        </div>

        <div className="mt-6">
          <Link to="/my-favorites" className="text-blue-500 hover:underline">Go to My Favorites →</Link>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            ← Back
       </button>
          </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
