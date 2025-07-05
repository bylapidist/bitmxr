import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, it, beforeEach, beforeAll, vi, expect } from 'vitest';
import TrackList from '../components/TrackList';
import { useStore } from '../state/useStore';

describe('TrackList', () => {
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
