// Importing the mongoose library to interact with MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Destructuring Schema from mongoose

// Define the schema for the Swap model
const SwapSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId, // Field to store the ID of the user who initiated the swap request
    ref: 'User', // Referencing the 'User' model in the database
    required: true, // Ensures that the requester field is required and must be specified
  },
  requestedPlant: {
    type: Schema.Types.ObjectId, // Field to store the ID of the plant requested for the swap
    ref: 'Plant', // Referencing the 'Plant' model in the database
    required: true, // Ensures that the requestedPlant field is required and must be specified
  },
  offeredPlant: {
    type: Schema.Types.ObjectId, // Field to store the ID of the plant offered for the swap
    ref: 'Plant', // Referencing the 'Plant' model in the database
  },
  status: {
    type: String, // Field to store the status of the swap request
    enum: ['pending', 'accepted', 'rejected'], // Specifies that the status can only have values 'pending', 'accepted', or 'rejected'
    default: 'pending', // Sets the default value of status to 'pending' if not provided
  },
  message: {
    type: String, // Field to store an optional message accompanying the swap request
    default: '', // Sets the default value of message to an empty string if not provided
  },
});

// Create and export the 'Swap' model using the defined schema
module.exports = mongoose.model('Swap', SwapSchema);
