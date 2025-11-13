import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../assets/components/Loader";

const MyGallery = () => {
  const [user, setUser] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Artify | My Gallery";
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate("/login");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const allArtworks = JSON.parse(localStorage.getItem("artworks")) || [];
    const myArtworks = allArtworks.filter((a) => a.userEmail === user.email);
    setArtworks(myArtworks);
    setLoading(false);
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;
    const allArtworks = JSON.parse(localStorage.getItem("artworks")) || [];
    const updatedArtworks = allArtworks.filter((a) => a.id !== id);
    localStorage.setItem("artworks", JSON.stringify(updatedArtworks));
    setArtworks(updatedArtworks.filter((a) => a.userEmail === user.email));
    toast.success("Artwork deleted!");
    setSelectedArtwork(null);
  };

 if (loading) return <Loader />;

  return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-[72px] px-6 pb-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
<h2 className="text-3xl font-bold mb-3 text-center text-gray-900 dark:text-white">
          My Gallery
    </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Explore all the artworks you've uploaded. You can update or remove any piece directly from your gallery.
        </p>

    {artworks.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            No artworks found.{" "}
         <span
              onClick={() => navigate("/add-artwork")}
              className="text-indigo-600 dark:text-indigo-400 underline cursor-pointer"
         >
              Add Artwork
            </span>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((art) => (
              <div
            key={art.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                <img
              src={art.imageURL}
          alt={art.title}
                  className="w-full h-56 object-cover rounded-t-xl"
                />
          <div className="p-4 flex flex-col justify-between min-h-[220px]">
                  <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {art.title}
                </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-3">
                {art.description || "No description"}
             </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
           Price: {art.price || "N/A"}
                    </p>
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={() => setSelectedArtwork(art)}
                      className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-2 rounded-lg hover:opacity-90 transition"                    >                   Update
                    </button>
                    <button
                      onClick={() => handleDelete(art.id)}
                      className="flex-1 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-2 rounded-lg hover:opacity-90 transition"
                    >
                      Delete
                    </button>
                              </div>
                </div>        
                </div>
            ))}
          </div>
        )}

        {selectedArtwork && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-3 text-center text-gray-900 dark:text-white">
       Update Artwork
              </h2>
              <img
                src={selectedArtwork.imageURL}
                alt={selectedArtwork.title}
                className="w-full h-36 object-cover rounded mb-3"
              />
              <form
                onSubmit={(e) => {
              e.preventDefault();
                  const allArtworks =                  
                   JSON.parse(localStorage.getItem("artworks")) || [];
              const updatedArtworks = allArtworks.map((a) =>
                    a.id === selectedArtwork.id
                      ? { ...a, ...selectedArtwork }
                    : a
                  );
                  localStorage.setItem(
               "artworks",
                    JSON.stringify(updatedArtworks)
                  );
                  setArtworks(
                    updatedArtworks.filter((a) => a.userEmail === user.email)
                  );
                  toast.success("Artwork updated!");
                  setSelectedArtwork(null);
                }}
                className="flex flex-col space-y-3"
              >
            <input
                  type="text"
                  value={selectedArtwork.title}
                  onChange={(e) =>
                    setSelectedArtwork({
                      ...selectedArtwork,
                      title: e.target.value,
                    })
                  }
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Title"
                />
    <textarea value={selectedArtwork.description}
                  onChange={(e) =>
                    setSelectedArtwork({
       ...selectedArtwork, description: e.target.value,
                    })
                  }
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Description"
                />
                <input
                  type="text"
             value={selectedArtwork.category}
                  onChange={(e) =>
                    setSelectedArtwork({
                      ...selectedArtwork,
                      category: e.target.value,
                    })
                  }
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Category"
                />
                <input
                  type="text"
           value={selectedArtwork.medium}
                  onChange={(e) =>
                    setSelectedArtwork({
                      ...selectedArtwork,
                      medium: e.target.value,
                    })
                  }
              className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
         placeholder="Medium/Tools"
                />
                  <input
                   type="text"  value={selectedArtwork.dimensions} onChange={(e) =>
                    setSelectedArtwork({
                      ...selectedArtwork,
                      dimensions: e.target.value,
                    })
                  }
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Dimensions"
                />
                <input
                  type="text"
                  value={selectedArtwork.price}
                  onChange={(e) =>
                    setSelectedArtwork({
                      ...selectedArtwork,
                      price: e.target.value,
                    })
                  }
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Price"
                />
                <div className="flex justify-between mt-2">
                  <button
                    type="button"
               onClick={() => setSelectedArtwork(null)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:opacity-90 transition"
                  >
                    Back
                  </button>
                  <div className="flex space-x-2">
                    <button
                      type="button"
              onClick={() => setSelectedArtwork(null)}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:opacity-90 transition"
                    >
               Cancel
                    </button>
       <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white rounded-lg hover:opacity-90 transition"
                         >
                      Update
                    </button>
              </div>
                </div>
    </form>
            </div>
          </div>
        )}

   <div className="text-center mt-12">
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

export default MyGallery;
