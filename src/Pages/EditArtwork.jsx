import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditArtwork = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate("/login");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const artworks = JSON.parse(localStorage.getItem("artworks")) || [];
    const art = artworks.find(
      (a) => String(a.id) === String(id) && a.userEmail === user.email
    );
    if (!art) {
      toast.error("Artwork not found or access denied");
      navigate("/my-gallery");
    } else {
      setFormData(art);
    }
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const artworks = JSON.parse(localStorage.getItem("artworks")) || [];
    const updatedArtworks = artworks.map((a) =>
      String(a.id) === String(id) ? { ...a, ...formData } : a
    );
    localStorage.setItem("artworks", JSON.stringify(updatedArtworks));
    toast.success("Artwork updated!");
    navigate("/my-gallery");
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Artwork</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
     <input
          type="text"
       placeholder="Image URL"
       name="imageURL" className="input w-full"
          value={formData.imageURL || ""}
       onChange={handleChange} required/>
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="input w-full"
          value={formData.title || ""}
          onChange={handleChange}
          required
        />
      <input type="text"   placeholder="Category"
          name="category"
          className="input w-full"
          value={formData.category || ""}
          onChange={handleChange}
        />
        <textarea placeholder="Description"  name="description"
          className="input w-full"
          value={formData.description || ""}
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          name="price"
          className="input w-full"
          value={formData.price || ""}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" >  Update Artwork
          </button>
      </form>
    </div>
 );
};

export default EditArtwork;
