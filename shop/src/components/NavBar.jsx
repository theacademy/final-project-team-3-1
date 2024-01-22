import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
    onSearch(inputValue);
  };

  const handleSearchButtonClick = () => {
    onSearch(input);
    navigate('/results');
  };

  return (
    <nav>
      <div className="navbar-container">
        <ul className="nav-links">
          <li><a href="/" className="nav-link-home">Home</a></li>
          <li><a href="/dashboard" className="nav-link-dashboard">Dashboard</a></li>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={input}
              onChange={handleInputChange}
            />
            <button type="button" className="search-button" onClick={handleSearchButtonClick}>
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
