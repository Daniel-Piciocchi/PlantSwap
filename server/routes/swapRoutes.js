// Importing required modules and libraries
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Swap = require('../models/swapModel'); // Importing the Swap model defined in '../models/swapModel'
const User = require('../models/User'); // Importing the User model defined in '../models/User'
const Plant = require('../models/plantModel'); // Importing the Plant model defined in '../models/plantModel'
const mongoose = require('mongoose'); // Importing mongoose for working with ObjectId

const JWT_SECRET = 'your_jwt_secret'; // Move the JWT secret to a constant

// Route to create a new swap request
router.post('/', async (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.replace('Bearer ', '');
    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET); // Verify the JWT token
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' }); // Send a 401 (Unauthorized) response if the token is invalid
    }

    const newSwap = new Swap({
      requester: decoded._id, // Set the requester to the ID decoded from the JWT token
      requestedPlant: req.body.requestedPlant, // Set the requestedPlant to the value from the request body
      message: req.body.message // Set the message to the value from the request body
    });

    try {
      const savedSwap = await newSwap.save(); // Save the new swap request to the database

      // Find the owner of the plant and update their swapRequests array
      const plant = await Plant.findById(req.body.requestedPlant); // Find the requested plant
      const plantOwner = await User.findById(plant.owner); // Find the owner of the plant
      plantOwner.swapRequests.push(savedSwap._id); // Push the ID of the new swap request to the owner's swapRequests array
      await plantOwner.save(); // Save the updated plant owner

      res.json(savedSwap); // Send the saved swap request as the response
    } catch (err) {
      console.error("Error in creating swap:", err.message);
      res.status(500).json({ error: err.message }); // Send a 500 (Internal Server Error) response if there's an error
    }
});

// Route to get all swap requests for a user
router.get('/:userId', async (req, res) => {
    try {
        console.log("Fetching swaps for user:", req.params.userId); // Log the userId being queried

        const ObjectId = mongoose.Types.ObjectId; // Import ObjectId from mongoose to convert string to ObjectId

        const swaps = await Swap.aggregate([
            {
                $lookup: {
                    from: "plants",
                    localField: "requestedPlant",
                    foreignField: "_id",
                    as: "plantDetails"
                }
            },
            {
                $match: {
                    "plantDetails.owner": new ObjectId(req.params.userId) // Match the plant owner's ID with the given userId
                }
            },
            {
                $unwind: "$plantDetails"
            }
        ]);

        console.log("Swaps after aggregation:", swaps); // Log the swaps after aggregation but before population

        // Populate the requester details (username and email) using the 'requester' field's ID
        const populatedSwaps = await Swap.populate(swaps, { path: 'requester', select: 'username email' });

        console.log("Swaps after population:", populatedSwaps); // Log the populated swaps

        res.json(populatedSwaps); // Send the populated swaps as the response
    } catch (err) {
        console.error("Error in fetching swaps for user:", err.message);
        res.status(500).json({ error: err.message }); // Send a 500 (Internal Server Error) response if there's an error
    }
});

// Route to update the status of a swap request
router.put('/:id', async (req, res) => {
  try {
    const updatedSwap = await Swap.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Find and update the swap request with the specified ID
    res.json(updatedSwap); // Send the updated swap request as the response
  } catch (err) {
    console.error("Error in updating swap:", err.message);
    res.status(500).json({ error: err.message }); // Send a 500 (Internal Server Error) response if there's an error
  }
});

// Route to delete a swap request
router.delete('/:id', async (req, res) => {
    try {
      await Swap.findByIdAndDelete(req.params.id); // Find and delete the swap request with the specified ID
      res.json({ message: "Swap request deleted successfully." }); // Send a success message as the response
    } catch (err) {
      console.error("Error in deleting swap:", err.message);
      res.status(500).json({ error: err.message }); // Send a 500 (Internal Server Error) response if there's an error
    }
});

// Export the router with the defined routes
module.exports = router;
