// Importing necessary modules and components
import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './AuthContext'; // Importing the AuthProvider from AuthContext.js
import App from './App'; // Importing the App component

const root = document.getElementById('root'); // Get the DOM element with the ID 'root'

// Create a root React element and render the application inside it
ReactDOM.createRoot(root).render(
  <React.StrictMode> {/* Enable React strict mode to highlight potential problems in the application */}
    <AuthProvider> {/* Wrap the entire application with the AuthProvider to provide authentication context */}
      <App /> {/* Render the main application component, App */}
    </AuthProvider>
  </React.StrictMode>
);
