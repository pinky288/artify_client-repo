import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../assets/components/Loader";

const AddArtwork = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageURL: "",
    title: "",
    category: "",
    medium: "",
    description: "",
    dimensions: "",
    price: "",
    visibility: "Public",
  });
  useEffect(() => {
    document.title = "Artify | Add Artwork";
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate("/login");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const artworks = JSON.parse(localStorage.getItem("artworks")) || [];
    artworks.push({
      id: Date.now(),
      ...formData,
      userName: user.displayName,
      userEmail: user.email,
    });
    localStorage.setItem("artworks", JSON.stringify(artworks));

    toast.success("Artwork added successfully!");
    setLoading(false);
    navigate("/my-gallery");
  };

  if (loading) return <Loader />;
  return (
    <div className="pt-[60px] min-h-[calc(100vh-72px)] flex items-start justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
          Add New Artwork
        </h2>

        {formData.imageURL && (
          <div className="w-full h-64 overflow-hidden rounded-lg shadow mb-6">
            <img
              src={formData.imageURL}
              alt="Preview"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400x300?text=Invalid+URL")
              }
            />
          </div>
        )}

     <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="imageURL"
            placeholder="Image URL"
            value={formData.imageURL}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
     <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="medium"
            placeholder="Medium/Tools"
            value={formData.medium}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
   <textarea
         name="description"
         placeholder="Description"
          value={formData.description}  onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input
            type="text"
            name="dimensions"
            placeholder="Dimensions (optional)"
            value={formData.dimensions}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"  />
          <input
            type="number"
            name="price"
            placeholder="Price (optional)"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-3 rounded-lg hover:bg-indigo-700 font-semibold transition-transform transform hover:scale-105"
          >   Add Artwork
              </button>
        </form>
   </div>
    </div>
  );
};

export default AddArtwork;
