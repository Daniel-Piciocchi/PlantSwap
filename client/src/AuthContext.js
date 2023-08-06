// Importing necessary modules from React
import React, { createContext, useState } from 'react';

// Create an empty context object called AuthContext
export const AuthContext = createContext();

// Create an AuthProvider component to wrap the application and provide authentication context
export const AuthProvider = ({ children }) => {
  // State variable to manage the authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Render the AuthContext.Provider component and provide the authentication state as context value
  // The value object contains the isLoggedIn state and the setIsLoggedIn function to update it
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children} {/* Render the child components passed to AuthProvider */}
    </AuthContext.Provider>
  );
};
