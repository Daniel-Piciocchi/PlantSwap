// Importing the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the Plant model
const PlantSchema = new mongoose.Schema({
  name: String, // Field to store the name of the plant as a String
  description: String, // Field to store the description of the plant as a String
  image: String, // Field to store the URL or filename of the plant image as a String
  owner: {
    type: mongoose.Schema.Types.ObjectId, // Field to store the owner's user ID as a reference to the User model
    ref: 'User', // Referencing the 'User' model in the database
    required: true, // Ensures that every plant must have an owner (user ID)
  },
});

// Create and export the 'Plant' model using the defined schema
module.exports = mongoose.model('Plant', PlantSchema);
