// BrowsePlantsPage.js
import React, { useState, useEffect } from 'react';
import request from 'superagent';
import '../css/BrowsePlants.css'; // Import the CSS

const BrowsePlantsPage = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await request.get('http://localhost:5001/plants');
      setPlants(response.body);
    };
    fetchPlants();
  }, []);

  const handleRequestSwap = async (plantId) => {
    // Here you can send a POST request to the server to create a new swap request
    // You might need to include the user ID and the plant ID in the request body
    console.log(`Request to swap plant with ID: ${plantId}`);
  };

  return (
    <main className="browse-plants">
      <h1>Browse Plants</h1>
      <h2>Plant Listings</h2>
      <div className="plant-grid">
        {plants.map((plant) => (
          <div className="plant-listing" key={plant._id}>
            <img src={`http://localhost:5001/uploads/${plant.image}`} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <button className="request-swap-button" onClick={() => handleRequestSwap(plant._id)}>Request Swap</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BrowsePlantsPage;
