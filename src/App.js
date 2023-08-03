import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import HomePage from './pages/HomePage';
import BrowsePlantsPage from './pages/BrowsePlantsPage';
import MyPlantsPage from './pages/MyPlantsPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import ContactPage from './pages/ContactPage';
import { AuthProvider } from './AuthContext'; // adjust the path according to your project structure

const App = () => (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse-plants" element={<BrowsePlantsPage />} />
          <Route path="/my-plants" element={<MyPlantsPage />} />
          <Route path="/login-register" element={<LoginRegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
  

export default App;
