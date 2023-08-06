import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import MyPlantsPage from './MyPlantsPage';

// Mock the superagent library
jest.mock('superagent', () => ({
  get: jest.fn().mockResolvedValue({ body: [] }),
  post: jest.fn().mockResolvedValue({ body: {} }),
  put: jest.fn().mockResolvedValue({ body: {} }),
  delete: jest.fn().mockResolvedValue({}),
}));

test('should render the component correctly', async () => {
  // Render the component and wait for useEffect to complete
  await act(async () => {
    render(<MyPlantsPage />);
  });

  // Verify that the component renders correctly
  const titleElement = screen.getByText('My Plant Listings');
  expect(titleElement).toBeInTheDocument();

  // You can add more assertions here to check the rendering of other elements

  // Test the button clicks (optional)
  const addButton = screen.getByText('Add Plant');
  fireEvent.click(addButton);
  // You can add assertions here to check the behavior of button clicks
});
