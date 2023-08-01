// MyPlantsPage.js
import React from 'react';
import '../css/MyPlants.css'; // Import the CSS

const plants = [
  { id: 1, image: 'plant1.jpg', name: 'Plant 1', description: 'Description 1' },
  { id: 2, image: 'plant2.jpg', name: 'Plant 2', description: 'Description 2' },
  { id: 3, image: 'plant3.jpg', name: 'Plant 3', description: 'Description 3' },
  { id: 4, image: 'plant4.jpg', name: 'Plant 4', description: 'Description 4' },
  { id: 5, image: 'plant5.jpg', name: 'Plant 5', description: 'Description 5' },
  { id: 6, image: 'plant6.jpg', name: 'Plant 6', description: 'Description 6' },
];

const MyPlantsPage = () => (
  <main className="myPlants">
    <h1>My Plant Listings</h1>
    <div className="plant-grid"> {/* Add a CSS class for the plant grid */}
      {plants.map((plant) => (
        <div className="plant-listing" key={plant.id}> {/* Add a CSS class for individual plant listings */}
          <img src={plant.image} alt={plant.name} />
          <h3>{plant.name}</h3>
          <p>{plant.description}</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  </main>
);

export default MyPlantsPage;
