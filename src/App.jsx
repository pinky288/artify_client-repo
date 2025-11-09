import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes.jsx";       
import Navbar from "./assets/components/Navbar.jsx";
import Footer from "./assets/components/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
