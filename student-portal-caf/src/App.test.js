import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders TII Portal sidebar', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const portalText = screen.getByText(/TII/i);
  expect(portalText).toBeInTheDocument();
});
