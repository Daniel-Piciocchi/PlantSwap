// Import required dependencies and test utilities
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import MyPlantsPage from './MyPlantsPage';  // Component under test

// Mock the superagent library for making network requests.
// This ensures that real network requests aren't made during testing and replaces them with mock functions.
jest.mock('superagent', () => ({
  get: jest.fn().mockResolvedValue({ body: [] }),      // Mock the GET request to resolve with an empty body
  post: jest.fn().mockResolvedValue({ body: {} }),     // Mock the POST request to resolve with an empty object
  put: jest.fn().mockResolvedValue({ body: {} }),      // Mock the PUT request to resolve with an empty object
  delete: jest.fn().mockResolvedValue({}),             // Mock the DELETE request to resolve without a body
}));

// Define the test suite
test('should render the component correctly', async () => {
  // Using the act function to wrap the render ensures that all updates related to the effects and their asynchronous tasks are finished before moving forward.
  await act(async () => {
    render(<MyPlantsPage />);
  });

  // After rendering, check that the component has rendered its title correctly
  const titleElement = screen.getByText('My Plant Listings');
  expect(titleElement).toBeInTheDocument();

  // Test the button clicks (This is an optional step)
  // Get the 'Add Plant' button element and simulate a click on it
  const addButton = screen.getByText('Add Plant');
  fireEvent.click(addButton);
  

});
