import React from 'react';
import { render } from '@testing-library/react';
import BrowsePlantsPage from './BrowsePlantsPage';

test('renders plant listings', () => {
  render(<BrowsePlantsPage />);
});
