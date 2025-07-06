import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import ThemeToggle from '../components/ThemeToggle';
import { useStore } from '../state/useStore';

describe('ThemeToggle', () => {
  beforeAll(() => {
    class RO { observe(){} unobserve(){} disconnect(){} }
    // @ts-expect-error polyfill
    global.ResizeObserver = RO;
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

  it('toggles color scheme', () => {
    useStore.setState({ colorScheme: 'light' });
    const { getByRole } = render(
      <MantineProvider>
        <ThemeToggle />
      </MantineProvider>
    );
    fireEvent.click(getByRole('button', { name: /toggle theme/i }));
    expect(useStore.getState().colorScheme).toBe('dark');
  });
});
