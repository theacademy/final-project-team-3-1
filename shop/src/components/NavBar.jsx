// Navbar.js
import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <div className="navbar-container">
      
        <ul className="nav-links">
          <li><a href="/home" className="nav-link-home">Home</a></li>
          <li><a href="/dashboard" className="nav-link-dashboard">Dashboard</a></li>
          <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <button type="button" className="search-button">
            Search
          </button>
        </div>
          <li><a href="/cart" className="nav-link-cart">Cart</a></li>
          <li><a href="/login" className="nav-link-login">Login</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
