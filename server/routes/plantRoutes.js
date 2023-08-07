// Importing required modules and libraries
const express = require('express');
const router = express.Router();
const Plant = require('../models/plantModel'); // Importing the Plant model defined in './models/plantModel'
const multer = require('multer'); // Multer is used for file uploads
const upload = multer({ dest: 'uploads/' }); // Configure multer to upload files to the 'uploads/' directory

// Route to retrieve all plants (with optional query parameter 'owner')
router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.query.owner) {
      query.owner = req.query.owner; // If 'owner' query parameter is present, filter by owner ID
    }
    const plants = await Plant.find(query).populate('owner'); // Find plants based on the query and populate the 'owner' field
    res.send(plants); // Send the retrieved plants as the response
  } catch (error) {
    console.error('Error retrieving plants:', error);
    res.status(500).send('Error retrieving plants'); // Send a 500 (Internal Server Error) response if there's an error
  }
});

// Route to retrieve plants owned by the authenticated user
router.get('/user', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated'); // Send a 401 (Unauthorized) response if the user is not authenticated
    }
    try {
      const plants = await Plant.find({ owner: req.user._id }); // Find plants owned by the authenticated user
      res.send(plants); // Send the user's plants as the response
    } catch (error) {
      console.error('Error retrieving user plants:', error);
      res.status(500).send('Error retrieving user plants'); // Send a 500 (Internal Server Error) response if there's an error
    }
});

// Route to add a new plant to the database
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated'); // Send a 401 (Unauthorized) response if the user is not authenticated
    }

    const plant = new Plant(req.body); // Create a new Plant instance with the data from the request body
    plant.owner = req.user._id; // Set the 'owner' field of the plant to the authenticated user's ID

    if (req.file) {
        const filePath = req.file.path.replace('uploads/', ''); // If an image file was uploaded, set the 'image' field to the file path
        plant.image = filePath;
    } else {
        plant.image = 'default.jpg'; // If no image was uploaded, use a default image
    }

    try {
      await plant.save(); // Save the new plant to the database
      res.send(plant); // Send the newly created plant as the response
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving plant to database'); // Send a 500 (Internal Server Error) response if there's an error
    }
});

// Route to handle plant swap requests (Not implemented in this code snippet)
router.post('/:id/request', async (req, res) => {
    // Implementation for handling plant swap requests would go here
});

// Route to delete a plant from the database
router.delete('/:id', async (req, res) => {
    try {
      const plant = await Plant.findByIdAndDelete(req.params.id); // Find and delete the plant with the specified ID
      if (!plant) return res.status(404).send("No item found"); // Send a 404 (Not Found) response if the plant is not found
      res.status(200).send(); // Send a 200 (OK) response upon successful deletion
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting plant'); // Send a 500 (Internal Server Error) response if there's an error
    }
});

// Route to update a plant in the database
router.put('/:id', upload.single('image'), async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated'); // Send a 401 (Unauthorized) response if the user is not authenticated
    }

    try {
        let plant = await Plant.findById(req.params.id); // Find the plant to be updated

        if (!plant) {
            return res.status(404).send('Plant not found'); // Send a 404 (Not Found) response if the plant is not found
        }

        if (String(plant.owner) !== String(req.user._id)) {
            return res.status(403).send('Not authorized to edit this plant'); // Send a 403 (Forbidden) response if the user is not the owner of the plant
        }

        // Update the plant fields from the request body
        if (req.body.name) plant.name = req.body.name;
        if (req.body.description) plant.description = req.body.description;

        if (req.file) {
            const filePath = req.file.path.replace('uploads/', ''); // If an image file was uploaded, update the 'image' field to the new file path
            plant.image = filePath;
        }

        await plant.save(); // Save the updated plant to the database
        res.send(plant); // Send the updated plant as the response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating plant'); // Send a 500 (Internal Server Error) response if there's an error
    }
});

// Export the router with the defined routes
module.exports = router;
