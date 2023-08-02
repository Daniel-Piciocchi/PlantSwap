import React, { useState } from 'react';
import '../css/MyPlants.css'; // Import the CSS

const plants = [
  { id: 1, image: '/arecaceae-plant.png', name: 'Plant 1', description: 'Description 1' },
  { id: 2, image: 'plant2.jpg', name: 'Plant 2', description: 'Description 2' },
  { id: 3, image: 'plant3.jpg', name: 'Plant 3', description: 'Description 3' },
  { id: 4, image: 'plant4.jpg', name: 'Plant 4', description: 'Description 4' },
  { id: 5, image: 'plant5.jpg', name: 'Plant 5', description: 'Description 5' },
  { id: 6, image: 'plant6.jpg', name: 'Plant 6', description: 'Description 6' },
];

const plantRequests = [
  { id: 1, plantId: 1, requester: 'John Doe', message: 'I would like to swap my plant for yours.', image: '/arecaceae-plant.png', description: 'Description for Request 1' },
  { id: 2, plantId: 2, requester: 'Jane Smith', message: 'Your plant looks amazing! Would you like to trade?', image: 'request2.jpg', description: 'Description for Request 2' },
  { id: 3, plantId: 3, requester: 'Mike Johnson', message: 'I am interested in your beautiful plant. Lets trade!', image: 'request3.jpg', description: 'Description for Request 3' },
  // Add more plant requests as needed
];

const MyPlantsPage = () => {
  const [isHovered, setIsHovered] = useState(
    plantRequests.reduce((acc, request) => ({ ...acc, [request.id]: false }), {})
  );

  return (
    <main className="myPlants">
      <h1>My Plant Listings</h1>
      <div className="plant-grid">
        {plants.map((plant) => (
          <div className="plant-listing" key={plant.id}>
            <img src={plant.image} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <div className="plant-buttons">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h2>Plant Requests</h2>
      <div className="plant-requests">
        {plantRequests.map((request) => (
          <div
            className="plant-request"
            key={request.id}
            onMouseEnter={() => setIsHovered({ ...isHovered, [request.id]: true })}
            onMouseLeave={() => setIsHovered({ ...isHovered, [request.id]: false })}
          >
            <div className="plant-image">
              <img src={request.image} alt={`Plant ${request.plantId}`} />
              <div className={`plant-description ${isHovered[request.id] ? 'active' : ''}`}>
                <p>{request.description}</p>
              </div>
            </div>
            <div className="plant-request-info">
              <p>Requester: {request.requester}</p>
              <p>Message: {request.message}</p>
            </div>
            <div className="plant-buttons">
              <button>Accept</button>
              <button>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyPlantsPage;
