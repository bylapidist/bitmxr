import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, it, beforeEach, beforeAll, vi, expect } from 'vitest';
import Mixer from '../components/Mixer';
import { useStore } from '../state/useStore';

describe('Mixer', () => {
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

  beforeEach(() => {
    useStore.setState({ tracks: [{ id: '1', name: 'Track 1' }] });
  });

  it('renders track names', () => {
    render(
      <MantineProvider>
        <Mixer />
      </MantineProvider>
    );
    expect(screen.getByText('Track 1')).toBeTruthy();
  });
});
