// Importing the mongoose library to interact with MongoDB
const mongoose = require('mongoose');
// Importing passport-local-mongoose for handling user authentication
const passportLocalMongoose = require('passport-local-mongoose');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  // Field to store the username of the user as a String
  username: {
    type: String,
    required: true, // Ensures that the username is required and must be specified
    unique: true, // Ensures that each username is unique
  },
  // Field to store the email of the user as a String
  email: {
    type: String,
    required: true, // Ensures that the email is required and must be specified
    unique: true, // Ensures that each email is unique
  },
  // Field to store an array of swap requests associated with the user
  swapRequests: [
    {
      type: mongoose.Schema.Types.ObjectId, // Field to store the ID of the swap request as a reference to the Swap model
      ref: 'Swap', // Referencing the 'Swap' model in the database
    },
  ],
});

// Plugin passportLocalMongoose to add username, password, and other methods related to authentication
UserSchema.plugin(passportLocalMongoose);

// Create and export the 'User' model using the defined schema
module.exports = mongoose.model('User', UserSchema);
