// Importing necessary modules and components
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import HomePage from './pages/HomePage';
import BrowsePlantsPage from './pages/BrowsePlantsPage';
import MyPlantsPage from './pages/MyPlantsPage';
import MessagesPage from './pages/MessagesPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import { AuthProvider } from './AuthContext'; // Importing the AuthProvider from AuthContext.js

// App component representing the main application
const App = () => (
  <AuthProvider> {/* Wrap the application with the AuthProvider to provide authentication context */}
    <Router> {/* Wrap the entire application with the Router component to enable client-side routing */}
      <Header /> {/* Display the Header component at the top of the application */}
      <Routes> {/* Use the Routes component to define the application's routes */}
        <Route path="/" element={<HomePage />} /> {/* Define the route for the HomePage component */}
        <Route path="/browse-plants" element={<BrowsePlantsPage />} /> {/* Define the route for the BrowsePlantsPage component */}
        <Route path="/my-plants" element={<MyPlantsPage />} /> {/* Define the route for the MyPlantsPage component */}
        <Route path="/messages" element={<MessagesPage />} /> {/* Define the route for the MessagesPage component */}
        <Route path="/login-register" element={<LoginRegisterPage />} /> {/* Define the route for the LoginRegisterPage component */}
      </Routes>
      <Footer /> {/* Display the Footer component at the bottom of the application */}
    </Router>
  </AuthProvider>
);

export default App; // Export the App component as the default export
