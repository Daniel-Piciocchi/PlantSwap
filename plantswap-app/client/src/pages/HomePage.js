// HomePage.js
import React from 'react';
import '../css/HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <main className="home">
    <h1>Welcome to PlantSwap</h1>
    <p>A platform for plant lovers to connect and swap plants</p>
    <Link to="/login-register">Get Started</Link>

    <h2>How It Works</h2>
    <ol>
      <li>Create an account</li>
      <li>Browse available plants</li>
      <li>Request a swap</li>
      <li>Coordinate with the other person</li>
    </ol>

    <h2>Featured Plants</h2>
    {/* Replace with your actual plant data */}
    <div>
      <Link to="/browse-plants">
        <img src="plant1.jpg" alt="Plant 1" />
        <p>Plant 1</p>
      </Link>
      <Link to="/browse-plants">
        <img src="plant2.jpg" alt="Plant 2" />
        <p>Plant 2</p>
      </Link>
      <Link to="/browse-plants">
        <img src="plant3.jpg" alt="Plant 3" />
        <p>Plant 3</p>
      </Link>
    </div>
  </main>
);

export default HomePage;
