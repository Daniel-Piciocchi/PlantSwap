// Importing necessary React hooks and the request library
import React, { useState, useEffect } from 'react';
import request from 'superagent';
import '../css/BrowsePlants.css'; // Importing CSS for this component

// Component for browsing plant listings
const BrowsePlantsPage = () => {
  // State for holding plant data
  const [plants, setPlants] = useState(null); // Initialize with null to indicate initial empty state
  
  // State for holding messages corresponding to each plant
  const [messages, setMessages] = useState({});
  
  // State for showing a popup notification
  const [showPopup, setShowPopup] = useState(false);

  // Effect hook to fetch plant data when the component mounts
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        // Making a GET request to fetch plants
        const response = await request.get('http://localhost:5001/plants');
        setPlants(response.body); // Updating the plants state
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
    
    fetchPlants(); // Initiating the fetch
  }, []); // Empty dependency array to ensure the effect runs only once

  // Handler for requesting a plant swap
  const handleRequestSwap = async (plantId) => {
    // Retrieve user token from local storage
    const token = localStorage.getItem('token');
    
    // Making a POST request to request a swap
    const response = await request
      .post('http://localhost:5001/swaps')
      .set('Authorization', `Bearer ${token}`)
      .send({ requester: 'userId', requestedPlant: plantId, message: messages[plantId] });
    
    console.log(response.body); // Logging the response for debugging purposes
    
    setShowPopup(true); // Display the popup on successful swap request
  };

  // Handler for updating messages as the user types
  const handleMessageChange = (plantId, message) => {
    setMessages({ ...messages, [plantId]: message }); // Update the specific plant's message
  };

  return (
    <main className="browse-plants">
      <h1>Browse Plants</h1>
      <h2>Plant Listings</h2>
      {plants === null ? (
        <p>Loading...</p> // Display a loading message while fetching data
      ) : plants.length === 0 ? (
        <p>No plants found.</p> // Display a message when no plants are available
      ) : (
        <div className="plant-grid">
          {/* Looping through the plants to render their data */}
          {plants.map((plant) => (
            <div className="plant-listing" key={plant._id}>
              <img src={`http://localhost:5001/uploads/${plant.image}`} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p>{plant.description}</p>
              <textarea
                placeholder="Enter your message here"
                value={messages[plant._id] || ''}
                onChange={(e) => handleMessageChange(plant._id, e.target.value)}
              />
              <button className="request-swap-button" onClick={() => handleRequestSwap(plant._id)}>Request Swap</button>
            </div>
          ))}
        </div>
      )}

      {/* Conditionally render the popup if the state is true */}
      {showPopup && (
        <div className="popup">
          <p>Swap Requested!</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </main>
  );
};

export default BrowsePlantsPage; // Exporting the component for external use
