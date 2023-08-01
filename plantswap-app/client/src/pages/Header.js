// Header.js
import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <Link to="/"><img src="logo.png" alt="Logo" /></Link>
    <nav>
      <Link to="/browse-plants">Browse</Link>
      <Link to="/my-plants">My:Plants</Link>
      <Link to="/login-register">Login/Register</Link>
    </nav>
  </header>
);

export default Header;
