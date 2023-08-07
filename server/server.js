// Importing required modules and libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('./passportConfig');
const multer = require('multer');
const jwt = require('jsonwebtoken');

// Creating an instance of the Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for the React app running on http://localhost:3000
// Allow credentials to be included in requests
app.use(cors({ origin: 'https://sensational-khapse-751756.netlify.app', credentials: true }));

// Parse incoming JSON data
app.use(express.json());

// Connect to MongoDB database using Mongoose
mongoose.connect('mongodb+srv://13723:Qj20hdAL1mnNsQPn@plantswapcluster.08o2syv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Import and register the 'User' and 'Plant' models from './models' directory
require('./models/User');
const User = mongoose.model('User');

require('./models/plantModel');
const Plant = mongoose.model('Plant');

// Configure express-session middleware to handle sessions
app.use(session({
  secret: 'Your secret key', // Secret key used to encrypt session data
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000, secure: false, httpOnly: false } // Set session cookie properties
}));

// Initialize Passport and use it for authentication
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware to extract and verify JWT token from request header
app.use(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return next();
  }

  try {
    const data = jwt.verify(token, 'your_jwt_secret'); // Replace 'your_jwt_secret' with the actual secret used to sign the JWT
    const user = await User.findOne({ _id: data._id });
    if (!user) {
      throw new Error();
    }

    req.user = user; // Attach the authenticated user object to the request
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authenticated' }); // Send error response if token verification fails
  }
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Include and use the authentication routes defined in './routes/authRoutes'
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Include and use the plant-related routes defined in './routes/plantRoutes'
const plantRoutes = require('./routes/plantRoutes');
app.use('/plants', plantRoutes);

// Include and use the swap-related routes defined in './routes/swapRoutes'
const swapRoutes = require('./routes/swapRoutes');
app.use('/swaps', swapRoutes);

// Set the port for the server to listen on (default to 5001)
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
