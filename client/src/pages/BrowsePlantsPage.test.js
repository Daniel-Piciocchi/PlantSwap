// Importing React and utilities from the testing-library
import React from 'react';
import { render } from '@testing-library/react';
// Importing the component to be tested
import BrowsePlantsPage from './BrowsePlantsPage';

// A test to check if the BrowsePlantsPage component renders without crashing
test('renders plant listings', () => {
  // Rendering the BrowsePlantsPage component
  render(<BrowsePlantsPage />);
});
