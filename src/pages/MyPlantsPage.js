import React, { useState, useEffect } from 'react';
import request from 'superagent';
import '../css/MyPlants.css';

const MyPlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({ name: '', image: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [editedPlant, setEditedPlant] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await request.get('http://localhost:5001/plants/user').set('Authorization', `Bearer ${token}`);
        setPlants(response.body);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
    fetchPlants();
  }, []);

  const handleDelete = async (id) => {
    try {
      await request.delete(`http://localhost:5001/plants/${id}`);
      setPlants(plants.filter((plant) => plant._id !== id));
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const formData = new FormData();
      formData.append('image', newPlant.image);
      formData.append('name', newPlant.name);
      formData.append('description', newPlant.description);
      const response = await request.post('http://localhost:5001/plants')
                                    .set('Authorization', `Bearer ${token}`)
                                    .send(formData);
      setPlants([...plants, response.body]);
      setNewPlant({ name: '', image: '', description: '' });
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  const handleImageUpload = (event) => {
    setNewPlant({ ...newPlant, image: event.target.files[0] });
  };

  const startEdit = (plant) => {
    console.log("Editing plant: ", plant);
    setEditMode(true);
    setEditedPlant(plant);
  };

  const handleEditChange = (field, value) => {
    setEditedPlant({ ...editedPlant, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', editedPlant.image);
      formData.append('name', editedPlant.name);
      formData.append('description', editedPlant.description);
      const response = await request.put(`http://localhost:5001/plants/${editedPlant._id}`)
                                    .set('Authorization', `Bearer ${token}`)
                                    .send(formData);
      const updatedPlant = response.body;
      const updatedPlants = plants.map(plant => plant._id === updatedPlant._id ? updatedPlant : plant);
      setPlants(updatedPlants);
      setEditMode(false);
      setShowPopup(true); 
    } catch (error) {
      console.error('Error updating plant:', error);
    }
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
              <button onClick={() => startEdit(plant)}>Edit</button>
              <button onClick={() => handleDelete(plant._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <p>Plant Updated!</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}

      {!editMode && (
        <>
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
        </>
      )}

      {editMode && (
        <>
          <h2>Edit Plant</h2>
          <div className="add-plant">
            <input
              type="text"
              placeholder="Plant name"
              value={editedPlant.name}
              onChange={(e) => handleEditChange('name', e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => handleEditChange('image', e.target.files[0])}
            />
            <textarea
              placeholder="Plant description"
              value={editedPlant.description}
              onChange={(e) => handleEditChange('description', e.target.value)}
            />
            <button onClick={handleUpdate}>Update Plant</button>
          </div>
        </>
      )}
    </main>
  );
};

export default MyPlantsPage;
