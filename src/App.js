// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import HomePage from './pages/HomePage';
import BrowsePlantsPage from './pages/BrowsePlantsPage';
import MyPlantsPage from './pages/MyPlantsPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import ContactPage from './pages/ContactPage'; // Import the ContactPage

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/browse-plants" element={<BrowsePlantsPage />} />
      <Route path="/my-plants" element={<MyPlantsPage />} />
      <Route path="/login-register" element={<LoginRegisterPage />} />
      <Route path="/contact" element={<ContactPage />} /> {/* Add a route for the ContactPage */}
      {/* Add more routes as needed */}
    </Routes>
    <Footer />
  </Router>
);

export default App;
