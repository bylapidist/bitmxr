import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import DeviceSelector from '../components/DeviceSelector';

vi.mock('@tauri-apps/api/core', () => ({ invoke: vi.fn() }));

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
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });
  it('shows validation error when no device selected', () => {
    render(
      <MantineProvider>
        <DeviceSelector devices={['A', 'B']} />
      </MantineProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /set device/i }));
    expect(screen.getByText('Device is required')).toBeTruthy();
  });
});
