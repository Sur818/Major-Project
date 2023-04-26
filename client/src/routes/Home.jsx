import React from "react";
import Navbar from "./Navbar";
import "../styles/Home.css"

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="Home">
      <h1>Congratulations, Your software is now ready to use.</h1>
      <p>You can now use our services</p>
    </div>
    </>
  );
};

export default Home;
