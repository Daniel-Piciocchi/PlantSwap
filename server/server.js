const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('./passportConfig');
const multer = require('multer'); // Add this line

const app = express();

// app.use(cors({ origin: 'https://main--sensational-khapse-751756.netlify.app', credentials: true }));

app.use(express.json());

mongoose.connect('mongodb+srv://13723:Qj20hdAL1mnNsQPn@plantswapcluster.08o2syv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

require('./models/User');
const User = mongoose.model('User');

require('./models/plantModel');
const Plant = mongoose.model('Plant');

app.use(session({
  secret: 'Your secret key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000, secure: false, httpOnly: false } // 1 hour
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use('/uploads', express.static('uploads')); // Add this line

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const plantRoutes = require('./routes/plantRoutes');
app.use('/plants', plantRoutes);

const swapRoutes = require('./routes/swapRoutes');
app.use('/swap', swapRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
