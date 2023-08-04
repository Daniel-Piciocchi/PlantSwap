import React, { useState, useEffect } from 'react';
import request from 'superagent';
import '../css/MyPlants.css'; // Import the CSS

const MyPlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({ name: '', image: '', description: '' });

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await request.get('http://localhost:5001/plants');
      setPlants(response.body);
    };
    fetchPlants();
  }, [plants]);

  const handleDelete = async (id) => {
    await request.delete(`http://localhost:5001/plants/${id}`);
    setPlants(plants.filter((plant) => plant._id !== id));
  };

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append('image', newPlant.image);
    formData.append('name', newPlant.name);
    formData.append('description', newPlant.description);
    const response = await request.post('http://localhost:5001/plants').send(formData);
    console.log('Server response:', response); // Log the entire server response
    console.log('Response data:', response.body); // Log the response data
    setPlants([...plants, response.body]);
    setNewPlant({ name: '', image: '', description: '' });
    console.log('Plants after adding:', plants); // Log the plants state after adding a plant
  };

  const handleImageUpload = (event) => {
    setNewPlant({ ...newPlant, image: event.target.files[0] });
  };

  return (
    <main className="myPlants">
      <h1>My Plant Listings</h1>
      <div className="plant-grid">
        {plants.map((plant) => (
          <div className="plant-listing" key={plant._id}>
            <img src={`http://localhost:5001/uploads/${plant.image}`} alt={plant.name} />

            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <div className="plant-buttons">
              <button>Edit</button>
              <button onClick={() => handleDelete(plant._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h2>Add a New Plant</h2>
      <div className="add-plant">
        <input
          type="text"
          placeholder="Plant name"
          value={newPlant.name}
          onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
        />
        <input
          type="file"
          onChange={handleImageUpload}
        />
        <textarea
          placeholder="Plant description"
          value={newPlant.description}
          onChange={(e) => setNewPlant({ ...newPlant, description: e.target.value })}
        />
        <button onClick={handleAdd}>Add Plant</button>
      </div>
    </main>
  );
};

export default MyPlantsPage;
