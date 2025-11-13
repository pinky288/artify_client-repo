import React, { useEffect } from "react";
import Banner from "../assets/components/Banner";
import Featured from "./Featured";

const Home = () => {
  useEffect(() => {
    document.title = "Artify | Home"; 
  }, []);

  return (
    <div className="w-full px-2 md:px-12 lg:px-15">
      <Banner />
      <Featured />
    </div>
  );
};

export default Home;
