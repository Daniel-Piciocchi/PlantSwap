// Import the necessary libraries and components for testing
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Needed for components using react-router's <Link>
import { AuthContext } from '../AuthContext';
import HomePage from './HomePage';

// Define a test suite for the HomePage component
describe('<HomePage />', () => {

  // Utility function to render the HomePage component within the required context and router
  // It allows simulating different login states
  const renderWithAuth = (isLoggedIn) => {
    return render(
      <AuthContext.Provider value={{ isLoggedIn }}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  // Ensure the component renders without crashing
  it('renders without crashing', () => {
    renderWithAuth(false);
  });

  // Check if the main heading is present
  it('displays the main heading', () => {
    renderWithAuth(false);
    expect(screen.getByText('Welcome to PlantSwap!')).toBeInTheDocument();
  });

  // Verify the presence and source of the Parlour Palm image
  it('renders the Parlour Palm image', () => {
    renderWithAuth(false);
    const image = screen.getByAltText('Parlour Palm');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('/images/Parlour_Palm.png');
  });

  // Check if "Get Started!" link is visible for guests (non-logged-in users)
  it('shows "Get Started!" link when user is not logged in', () => {
    renderWithAuth(false);
    const linkElement = screen.getByText('Get Started!');
    expect(linkElement).toBeInTheDocument();
  });

  // Ensure the "Get Started!" link is hidden for logged-in users
  it('does not show "Get Started!" link when user is logged in', () => {
    renderWithAuth(true);
    const linkElement = screen.queryByText('Get Started!');
    expect(linkElement).not.toBeInTheDocument();
  });

});
