// HomePage.js
// Import necessary React hooks and routing utilities
import React, { useContext } from 'react';
import '../css/HomePage.css'; // Import styles for the HomePage component
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import the authentication context for checking login state

// HomePage component
const HomePage = () => {
  // Destructure and access the isLoggedIn state from the AuthContext
  const { isLoggedIn } = useContext(AuthContext);

  // Log the value of isLoggedIn for debugging purposes
  console.log('Is logged in:', isLoggedIn);

  return (
    <main className="home">
      <h1>Welcome to PlantSwap!</h1>
      <p>A platform for plant lovers to connect and swap plants</p>
      { /* Displaying an image of Parlour Palm */ }
      <img src="/images/Parlour_Palm.png" alt="Parlour Palm" className="parlour-palm-image"/>
      <br></br>
      {/* Conditionally render the 'Get Started' link based on the login state */}
      {!isLoggedIn && <Link to="/login-register">Get Started!</Link>}

      <h2>How It Works</h2>
      { /*List explaining the working of the platform */}
      <ol>
        <li>Create an account</li>
        <li>Browse available plants</li>
        <li>Request a swap</li>
        <li>Coordinate with the other person</li>
      </ol>
    </main>
  );
};

export default HomePage; // Export the HomePage component for external use
