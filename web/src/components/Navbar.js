import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div id="navbar">
      <img src={logo} alt="Main" id="navbar-logo" />
      <p id="navbar-title">SaveNSeek</p>

      <div id="navbar-button-div">
        <Link to="/" className="navbar-button">
          Home
        </Link>
        <Link href="/" className="navbar-button">
          Map
        </Link>
        <Link href="/" className="navbar-button">
          Live Updates
        </Link>
        <Link href="/" className="navbar-button">
          About Us
        </Link>
        <Link href="/" className="navbar-button">
          Donate
        </Link>
        <Link to="/login" className="navbar-button" id="navbar-signin">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
