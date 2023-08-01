import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/1HomePage';
import { AboutPage } from './pages/AboutPage';
import { CreateAccount } from './pages/CreateAccount';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the HomePage route with index={0} */}
        <Route path="/" element={<HomePage />} index={0} />

        {/* Add other routes for different pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
