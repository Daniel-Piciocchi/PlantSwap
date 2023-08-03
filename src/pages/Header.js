import React, { useState, useContext } from 'react';
import '../css/Header.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import logo from '../images/logo2.png'; // Import the logo image
import { AuthContext } from '../AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Get setIsLoggedIn from AuthContext
  const navigate = useNavigate(); // Get the useNavigate function

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false
    navigate('/'); // Redirect to home page
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo" style={{ maxWidth: '30px' }} /> {/* Limit the logo size to a maximum width of 100px */}
      </Link>
      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <Link to="/browse-plants">Browse</Link>
        {isLoggedIn ? (
          <>
            <Link to="/my-plants">My:Plants</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link> {/* When the logout link is clicked, handleLogout will be called */}
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
