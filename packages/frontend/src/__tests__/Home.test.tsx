import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import * as tauri from '@tauri-apps/api/tauri';
import Home from '../routes/home';

vi.mock('@mantine/core', () => ({ Button: (props: any) => <button {...props} /> }));

vi.mock('@tauri-apps/api/tauri', () => ({
  invoke: vi.fn(),
}));

test('fetches stats on button click', async () => {
  (tauri.invoke as any).mockResolvedValue('stats');
  render(<Home />);
  fireEvent.click(screen.getByRole('button', { name: /get audio stats/i }));
  await waitFor(() => {
    expect(screen.getByText('stats')).toBeInTheDocument();
  });
});
