import React, { useState, useEffect } from 'react';
import request from 'superagent';
import '../css/BrowsePlants.css';

const BrowsePlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await request.get('http://localhost:5001/plants');
      setPlants(response.body);
    };
    fetchPlants();
  }, []);

  const handleRequestSwap = async (plantId) => {
    const token = localStorage.getItem('token');
    const response = await request
      .post('http://localhost:5001/swaps')
      .set('Authorization', `Bearer ${token}`)
      .send({ requester: 'userId', requestedPlant: plantId, message: messages[plantId] });
    console.log(response.body);
  };

  const handleMessageChange = (plantId, message) => {
    setMessages({ ...messages, [plantId]: message });
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
            <textarea
              placeholder="Enter your message here"
              value={messages[plant._id] || ''}
              onChange={(e) => handleMessageChange(plant._id, e.target.value)}
            />
            <button className="request-swap-button" onClick={() => handleRequestSwap(plant._id)}>Request Swap</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BrowsePlantsPage;
