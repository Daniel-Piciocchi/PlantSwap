const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');

// Create Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Use JSON middleware to automatically parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://13723:Qj20hdAL1mnNsQPn@plantswapcluster.08o2syv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Import User model
require('./models/User');

// Get User model
const User = mongoose.model('User');

app.use(session({
    secret: 'Your secret key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
