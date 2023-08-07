// Importing required modules and libraries
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken'); // Add this line to import the 'jsonwebtoken' library
const router = express.Router();
const User = require('../models/User');

// Route to handle user registration
router.post('/register', (req, res) => {
    console.log('Received registration request for email:', req.body.email); // Log the email
    console.log('Received registration request for username:', req.body.username); // Log the username

    // Register a new user using the provided username, email, and password
    User.register(new User({ 
        username: req.body.username, 
        email: req.body.email 
    }), req.body.password, (err, user) => {
        if (err) {
            console.log('Error during registration:', err);
            res.status(500).send(err); // Send a 500 (Internal Server Error) response if registration fails
        } else {
            // Authenticate the newly registered user
            passport.authenticate('local')(req, res, () => {
                console.log('User registered:', user);
                res.status(200).send('Registered'); // Send a 200 (OK) response upon successful registration and authentication
            });
        }
    });
});

// Route to handle user login
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('User logged in:', req.user);
  
  // Create a JWT (JSON Web Token) that includes the user's _id
  const token = jwt.sign({ _id: req.user._id.toString() }, 'your_jwt_secret'); // Replace 'your_jwt_secret' with the actual secret used to sign the JWT

  // Send the JWT to the client in the response
  res.send({ token });
});

// Route to handle user logout
router.get('/logout', (req, res) => {
  // Call the 'logout' function provided by Passport to log the user out
  req.logout((err) => {
    if (err) {
      console.log('Error during logout:', err);
      res.status(500).send(err); // Send a 500 (Internal Server Error) response if logout fails
    } else {
      console.log('User logged out');
      res.status(200).send('Logged out successfully'); // Send a 200 (OK) response upon successful logout
    }
  });
});

// Export the router with the defined routes
module.exports = router;