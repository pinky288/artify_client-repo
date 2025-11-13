import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import Explore from "../Pages/Explore";
import AddArtwork from "../Pages/AddArtwork";
import MyGallery from "../Pages/MyGallery";
import EditArtwork from "../Pages/EditArtwork";
import Login from "../Login";
import Register from "../Pages/Register";
import ArtworkDetails from "../Pages/ArtworkDetails";
import MyFavorites from "../Pages/MyFavorites";
import PrivateRoute from "../assets/components/PrivateRoute"; 
import NotFound from "../Pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" 
    element={<Home />} />
    <Route path="/explore" 
    element={<Explore />} />
      <Route path="/add-artwork" 
      element={
      <PrivateRoute><AddArtwork /></PrivateRoute>
    } />
    <Route path="/my-gallery" 
    element={
      <PrivateRoute><MyGallery /></PrivateRoute>
    } />
    <Route path="/edit-artwork/:id" 
    element={
      <PrivateRoute><EditArtwork /></PrivateRoute>
    } />
    <Route path="/login" 
    element={<Login />} />
 <Route path="/register" 
    element={<Register />} />
    <Route path="/artwork/:id" 
    element={
      <PrivateRoute><ArtworkDetails /></PrivateRoute>
    } />
    <Route path="/my-favorites" 
    element={
      <PrivateRoute><MyFavorites /></PrivateRoute>
    } />
    <Route path="/404" 
    element={<NotFound />} />
<Route path="*" 
element={<Navigate to="/404" />} />
  </Routes>
);

export default AppRoutes;
