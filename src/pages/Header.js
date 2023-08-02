// Header.js
import React, { useState } from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo2.png'; // Import the logo image

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo" style={{ maxWidth: '30px' }} /> {/* Limit the logo size to a maximum width of 100px */}
      </Link>
      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <Link to="/browse-plants">Browse</Link>
        <Link to="/my-plants">My:Plants</Link>
        <Link to="/login-register">Login/Register</Link>
      </nav>
      <button className={`hamburger-menu ${isOpen ? 'hide' : ''}`} onClick={toggleNav}>☰</button>
      <button className={`close-btn ${isOpen ? '' : 'hide'}`} onClick={toggleNav}>X</button>
    </header>
  );
};

export default Header;
