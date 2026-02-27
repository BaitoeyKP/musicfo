import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders app without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Test that the app renders without errors
  expect(true).toBe(true);
});
