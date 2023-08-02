// BrowsePlantsPage.js
import React from 'react';
import '../css/BrowsePlants.css'; // Import the CSS

const plants = [
  { id: 1, image: 'plant1.jpg', name: 'Plant 1', latinName: 'Latin name 1', description: 'Description 1' },
  { id: 2, image: 'plant2.jpg', name: 'Plant 2', latinName: 'Latin name 2', description: 'Description 2' },
  { id: 3, image: 'plant3.jpg', name: 'Plant 3', latinName: 'Latin name 3', description: 'Description 3' },
  { id: 4, image: 'plant4.jpg', name: 'Plant 4', latinName: 'Latin name 4', description: 'Description 4' },
  { id: 5, image: 'plant5.jpg', name: 'Plant 5', latinName: 'Latin name 5', description: 'Description 5' },
  { id: 6, image: 'plant6.jpg', name: 'Plant 6', latinName: 'Latin name 6', description: 'Description 6' },
];

const BrowsePlantsPage = () => (
    <main className="browse-plants">
      <h1>Browse Plants</h1>
      <h2>Plant Listings</h2>
      <div className="plant-grid">
        {plants.map((plant) => (
          <div className="plant-listing" key={plant.id}>
            <img src={plant.image} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>{plant.latinName}</p>
            <p>{plant.description}</p>
            <button className="request-swap-button">Request Swap</button> {/* Add the Request Swap button */}
          </div>
        ))}
      </div>
    </main>
  );
  
  export default BrowsePlantsPage;