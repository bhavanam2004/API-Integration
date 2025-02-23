// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the Weather App/i);
  expect(linkElement).toBeInTheDocument();
});
