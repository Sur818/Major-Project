import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"

const Navbar = () => {
  const naviagte = useNavigate();
  function handleClick() {
    localStorage.clear();
    naviagte("/");
  }

  return (
    <div className="Navbar">
      <h1>Home</h1>
      <ul>
        <li>Services</li>
        <li onClick={handleClick}>Logout</li>
      </ul>
    </div>
  );
};

export default Navbar;
