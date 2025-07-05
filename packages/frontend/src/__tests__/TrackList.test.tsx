import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, beforeAll, vi, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import TrackList from '../components/TrackList';
import { useStore } from '../state/useStore';

describe('TrackList', () => {
  beforeAll(() => {
    class RO {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    // @ts-expect-error -- polyfill for testing
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

  beforeEach(() => {
    useStore.setState({ tracks: [] });
  });

  it('renders without crashing', () => {
    render(
      <MantineProvider>
        <TrackList />
      </MantineProvider>
    );
    expect(screen.getByText('Add Track')).toBeTruthy();
  });
});
