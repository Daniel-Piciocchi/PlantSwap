// HomePage.js
import React, { useContext } from 'react';
import '../css/HomePage.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import the AuthContext

const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext); // Access the isLoggedIn state from the AuthContext

  console.log('Is logged in:', isLoggedIn); // Log the value of isLoggedIn

  return (
    <main className="home">
      <h1>Welcome to PlantSwap</h1>
      <p>A platform for plant lovers to connect and swap plants</p>
      {!isLoggedIn && <Link to="/login-register">Get Started</Link>} {/* Render the link conditionally based on isLoggedIn state */}

      <h2>How It Works</h2>
      <ol>
        <li>Create an account</li>
        <li>Browse available plants</li>
        <li>Request a swap</li>
        <li>Coordinate with the other person</li>
      </ol>
    </main>
  );
};

export default HomePage;
