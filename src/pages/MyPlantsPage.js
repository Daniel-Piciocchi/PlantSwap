// Importing necessary modules and styles
import React, { useState, useEffect } from 'react';
import superagent from 'superagent'; // Importing superagent library for making HTTP requests
import '../css/MyPlants.css';

const MyPlantsPage = () => {
  // State variables to manage plants, newPlant form, edit mode, edited plant, and popup display
  const [plants, setPlants] = useState([]); // An array to store the user's plants
  const [newPlant, setNewPlant] = useState({ name: '', image: '', description: '' }); // State for new plant form
  const [editMode, setEditMode] = useState(false); // Boolean state to control edit mode for a specific plant
  const [editedPlant, setEditedPlant] = useState({}); // State to hold the edited plant data
  const [showPopup, setShowPopup] = useState(false); // State to control the display of a success popup message

  // useEffect to fetch user's plants when the component mounts
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the user's authentication token from local storage
        const response = await superagent // Use superagent library to make an authenticated GET request to fetch user's plants
          .get('https://plantswap-6dabb95ad1f6.herokuapp.com/plants/user')
          .set('Authorization', `Bearer ${token}`);
        setPlants(response.body); // Update the state with the fetched plant data
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
    fetchPlants();
  }, []);

  // Function to handle the deletion of a plant
  const handleDelete = async (id) => {
    try {
      await superagent.delete(`https://plantswap-6dabb95ad1f6.herokuapp.com/plants/${id}`); // Use superagent to make an authenticated DELETE request to delete the plant
      setPlants(plants.filter((plant) => plant._id !== id)); // Update the state by filtering out the deleted plant from the plants array
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  // Function to handle adding a new plant
  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the user's authentication token from local storage
      const formData = new FormData(); // Create a new FormData instance to send the form data
      formData.append('image', newPlant.image);
      formData.append('name', newPlant.name);
      formData.append('description', newPlant.description);
      const response = await superagent // Use superagent to make an authenticated POST request to add the new plant
        .post('https://plantswap-6dabb95ad1f6.herokuapp.com/plants')
        .set('Authorization', `Bearer ${token}`)
        .send(formData);
      setPlants([...plants, response.body]); // Update the state by adding the newly added plant to the plants array
      setNewPlant({ name: '', image: '', description: '' }); // Clear the newPlant form fields
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  // Function to handle image upload for the new plant form
  const handleImageUpload = (event) => {
    setNewPlant({ ...newPlant, image: event.target.files[0] }); // Update the newPlant state with the selected image file
  };

  // Function to set edit mode and set the plant data to be edited
  const startEdit = (plant) => {
    console.log("Editing plant: ", plant);
    setEditMode(true); // Set the edit mode to true to switch to edit mode
    setEditedPlant(plant); // Set the editedPlant state to the plant data that needs to be edited
  };

  // Function to handle changes to the edited plant data
  const handleEditChange = (field, value) => {
    setEditedPlant({ ...editedPlant, [field]: value }); // Update the editedPlant state with the changed field and its value
  };

  // Function to handle the update of an edited plant
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the user's authentication token from local storage
      const formData = new FormData(); // Create a new FormData instance to send the updated form data
      formData.append('image', editedPlant.image);
      formData.append('name', editedPlant.name);
      formData.append('description', editedPlant.description);
      const response = await superagent // Use superagent to make an authenticated PUT request to update the edited plant
        .put(`https://plantswap-6dabb95ad1f6.herokuapp.com/plants/${editedPlant._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(formData);
      const updatedPlant = response.body; // Get the updated plant data from the response
      const updatedPlants = plants.map((plant) => plant._id === updatedPlant._id ? updatedPlant : plant); // Map through the plants array to update the specific edited plant
      setPlants(updatedPlants); // Update the state with the updated plants array
      setEditMode(false); // Switch off the edit mode
      setShowPopup(true); // Display the success popup message
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };

  // Render the component
  return (
    <main className="myPlants">
      <h1>My Plant Listings</h1>
      <div className="plant-grid">
        {plants.map((plant) => (
          <div className="plant-listing" key={plant._id}>
            <img src={`https://plantswap-6dabb95ad1f6.herokuapp.com/uploads/${plant.image}`} alt={plant.name} />
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

      {/* Display the add new plant form if not in edit mode */}
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

      {/* Display the edit plant form if in edit mode */}
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
