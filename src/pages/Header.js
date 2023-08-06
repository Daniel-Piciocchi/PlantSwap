// Importing necessary React hooks, styles, and routing utilities
import React, { useState, useContext } from 'react';
import '../css/Header.css'; // Styles for the header
import { Link, useNavigate } from 'react-router-dom'; // Routing utilities
import logo from '../images/logo2.png'; // Importing logo image
import { AuthContext } from '../AuthContext'; // Importing the authentication context

// Header component
const Header = () => {
  // State for toggling the navigation menu
  const [isOpen, setIsOpen] = useState(false);
  
  // Getting the login status and its setter function from AuthContext
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to toggle navigation menu visibility
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Updating the login status to logged out
    navigate('/'); // Redirecting to the homepage after logout
  };

  return (
    <header className="header">
      {/* Logo linking to the homepage */}
      <Link to="/">
        <img src={logo} alt="Logo" style={{ maxWidth: '30px' }} />
      </Link>
      
      {/* Navigation menu */}
      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        {/* Showing the Browse link if the user is logged in */}
        {isLoggedIn && <Link to="/browse-plants">Browse</Link>}
        
        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <>
            <Link to="/my-plants">My:Plants</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          // Showing Login/Register link if the user is not logged in
          <Link to="/login-register">Login/Register</Link>
        )}
      </nav>
      
      {/* Hamburger menu button for toggling navigation visibility */}
      <button className={`hamburger-menu ${isOpen ? 'hide' : ''}`} onClick={toggleNav}>☰</button>
      
      {/* Close button for toggling navigation visibility */}
      <button className={`close-btn ${isOpen ? '' : 'hide'}`} onClick={toggleNav}>X</button>
    </header>
  );
};

export default Header; // Exporting the Header component
