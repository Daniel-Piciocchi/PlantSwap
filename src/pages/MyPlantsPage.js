import React, { useState, useEffect } from 'react';
import request from 'superagent';
import '../css/MyPlants.css'; // Import the CSS

const MyPlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({ name: '', image: '', description: '' });

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you're storing the token in local storage
        const response = await request.get('http://localhost:5001/plants/user').set('Authorization', `Bearer ${token}`);
        console.log('Fetched plants:', response.body);
        setPlants(response.body);
      } catch (error) {
        console.error('Error fetching plants:', error);
        // Handle the error, maybe set some state to show an error message to the user
      }
    };
    fetchPlants();
  }, []); // Removed plants from the dependency array

  const handleDelete = async (id) => {
    try {
      await request.delete(`http://localhost:5001/plants/${id}`);
      setPlants(plants.filter((plant) => plant._id !== id));
    } catch (error) {
      console.error('Error deleting plant:', error);
      // Handle the error, maybe set some state to show an error message to the user
    }
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('token'); // Fetch the token again for the POST request
      const formData = new FormData();
      formData.append('image', newPlant.image);
      formData.append('name', newPlant.name);
      formData.append('description', newPlant.description);
      const response = await request.post('http://localhost:5001/plants')
                                    .set('Authorization', `Bearer ${token}`) // Include the token in the request header
                                    .send(formData);
      console.log('Server response:', response);
      console.log('Response data:', response.body);
      setPlants([...plants, response.body]);
      setNewPlant({ name: '', image: '', description: '' });
      console.log('Plants after adding:', plants);
    } catch (error) {
      console.error('Error adding plant:', error);
      // Handle the error, maybe set some state to show an error message to the user
    }
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
