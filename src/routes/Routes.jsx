import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Explore from "../Pages/Explore"; 

const routes = () => {
  return (
    <Routes>
      <Route path="/" 
      element={<Home />} 
      />
      <Route path="/explore" 
      element={<Explore />} 
      /> 
    </Routes>
  );
};

export default routes;
