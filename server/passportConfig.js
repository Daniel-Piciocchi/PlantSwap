// Importing the required modules and libraries
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User'); // Assuming that the 'User' model is defined and exported from './models/User'

// Configure the Passport LocalStrategy with the 'User.authenticate()' function
passport.use(new LocalStrategy(User.authenticate()));

// Serialize the user object to store in the session
passport.serializeUser(User.serializeUser());

// Deserialize the user object from the session
passport.deserializeUser(User.deserializeUser());

// Export the configured Passport instance
module.exports = passport;

// Import and apply the custom JWT strategy defined in './jwtStrategy'
require('./jwtStrategy')(passport);
