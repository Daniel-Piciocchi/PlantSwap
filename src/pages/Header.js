import React, { useState, useContext } from 'react';
import '../css/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo2.png';
import { AuthContext } from '../AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo" style={{ maxWidth: '30px' }} />
      </Link>
      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        {isLoggedIn && <Link to="/browse-plants">Browse</Link>}
        {isLoggedIn ? (
          <>
            <Link to="/my-plants">My:Plants</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <Link to="/login-register">Login/Register</Link>
        )}
      </nav>
      <button className={`hamburger-menu ${isOpen ? 'hide' : ''}`} onClick={toggleNav}>☰</button>
      <button className={`close-btn ${isOpen ? '' : 'hide'}`} onClick={toggleNav}>X</button>
    </header>
  );
};

export default Header;
