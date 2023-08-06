import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import HomePage from './pages/HomePage';
import BrowsePlantsPage from './pages/BrowsePlantsPage';
import MyPlantsPage from './pages/MyPlantsPage';
import MessagesPage from './pages/MessagesPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import { AuthProvider } from './AuthContext';

const App = () => (
  <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse-plants" element={<BrowsePlantsPage />} />
        <Route path="/my-plants" element={<MyPlantsPage />} />
        <Route path="/messages" element={<MessagesPage />} /> {/* Add this line */}
        <Route path="/login-register" element={<LoginRegisterPage />} />
      </Routes>
      <Footer />
    </Router>
  </AuthProvider>
);

export default App;
