import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
vi.mock('@mantine/notifications', () => ({ Notifications: () => null }));
import App from '../app';

test('renders home route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Bitmxr')).toBeInTheDocument();
});
