import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";

const Navbar = () => {
  const [user, setUser] = useState(null);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Logo" />
          <span>My Twitch Tools</span>
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/ascii-art">ASCII Art Creator</Link>
        <Link to="/filters">Image Filters</Link>
        <Link to="/placeholder">Placeholder Tool</Link>
      </div>
      <div className="navbar-right">
        <AuthButton user={user} />
      </div>
    </nav>
  );
};

export default Navbar;
