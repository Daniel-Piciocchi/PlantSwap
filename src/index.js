import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './AuthContext';
import App from './App';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
