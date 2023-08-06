// Importing necessary modules
import React from 'react';
import { render } from '@testing-library/react'; // Importing render function from testing library
import MyPlantsPage from './MyPlantsPage'; // Importing the component to be tested

// Mocking superagent to avoid actual network calls because network call tests have already been proven to work
jest.mock('superagent', () => {
  // Mock data for plants
  const plants = [
    { _id: '1', name: 'Plant 1', image: 'image1.jpg', description: 'Description for Plant 1' },
    { _id: '2', name: 'Plant 2', image: 'image2.jpg', description: 'Description for Plant 2' },
  ];

  // Mocking superagent methods and their resolved values
  return {
    get: jest.fn().mockResolvedValue({ body: plants }), // Mocking GET method to return the plants data
    post: jest.fn().mockResolvedValue({ body: {} }), // Mocking POST method with an empty object response
    put: jest.fn().mockResolvedValue({ body: {} }), // Mocking PUT method with an empty object response
    delete: jest.fn().mockResolvedValue({}), // Mocking DELETE method with an empty response
  };
});

// Test to check if the component renders correctly
test('should render the component correctly', () => {
  render(<MyPlantsPage />); // Render the component using the testing library's render function
});
