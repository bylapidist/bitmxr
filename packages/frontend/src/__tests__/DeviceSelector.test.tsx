import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import DeviceSelector from '../components/DeviceSelector';

vi.mock('@tauri-apps/api/tauri', () => ({ invoke: vi.fn() }));

describe('DeviceSelector', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });
  it('shows validation error when no device selected', () => {
    render(<DeviceSelector devices={['A', 'B']} />);
    fireEvent.click(screen.getByRole('button', { name: /set device/i }));
    expect(screen.getByText('Device is required')).toBeTruthy();
  });
});
