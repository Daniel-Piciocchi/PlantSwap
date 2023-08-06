import React from 'react';
import { render } from '@testing-library/react';
import MyPlantsPage from './MyPlantsPage';


// Mock superagent to avoid actual network calls
jest.mock('superagent', () => {
  const plants = [
    { _id: '1', name: 'Plant 1', image: 'image1.jpg', description: 'Description for Plant 1' },
    { _id: '2', name: 'Plant 2', image: 'image2.jpg', description: 'Description for Plant 2' },
    // Add more sample plant data if needed
  ];

  return {
    get: jest.fn().mockResolvedValue({ body: plants }),
    post: jest.fn().mockResolvedValue({ body: {} }),
    put: jest.fn().mockResolvedValue({ body: {} }),
    delete: jest.fn().mockResolvedValue({}),
  };
});

test('should render the component correctly', () => {
  render(<MyPlantsPage />);
});
