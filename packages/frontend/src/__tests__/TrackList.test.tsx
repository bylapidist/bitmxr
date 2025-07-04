import { render, screen } from '@testing-library/react';
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
  });

  beforeEach(() => {
    useStore.setState({ tracks: [] });
  });

  it('renders without crashing', () => {
    render(<TrackList />);
    expect(screen.getByText('Add Track')).toBeTruthy();
  });
});
