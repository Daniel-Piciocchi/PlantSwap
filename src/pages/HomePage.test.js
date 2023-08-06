import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Required for <Link> to not fail during tests
import { AuthContext } from '../AuthContext';
import HomePage from './HomePage';

describe('<HomePage />', () => {

  // Wrapper component to provide required context to HomePage
  const renderWithAuth = (isLoggedIn) => {
    return render(
      <AuthContext.Provider value={{ isLoggedIn }}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  it('renders without crashing', () => {
    renderWithAuth(false);
  });

  it('displays the main heading', () => {
    renderWithAuth(false);
    expect(screen.getByText('Welcome to PlantSwap!')).toBeInTheDocument();
  });

  it('renders the Parlour Palm image', () => {
    renderWithAuth(false);
    const image = screen.getByAltText('Parlour Palm');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('/images/Parlour_Palm.png');
  });

  it('shows "Get Started!" link when user is not logged in', () => {
    renderWithAuth(false);
    const linkElement = screen.getByText('Get Started!');
    expect(linkElement).toBeInTheDocument();
  });

  it('does not show "Get Started!" link when user is logged in', () => {
    renderWithAuth(true);
    const linkElement = screen.queryByText('Get Started!');
    expect(linkElement).not.toBeInTheDocument();
  });

});
