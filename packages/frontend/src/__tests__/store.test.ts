import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../state/useStore';

beforeEach(() => {
  useStore.setState({ tracks: [], selectedDevice: undefined });
});

describe('store', () => {
  it('adds tracks', () => {
    useStore.getState().addTrack({ id: '1', name: 'Track 1' });
    expect(useStore.getState().tracks).toHaveLength(1);
  });

  it('removes tracks', () => {
    useStore.getState().addTrack({ id: '1', name: 'Track 1' });
    useStore.getState().removeTrack('1');
    expect(useStore.getState().tracks).toHaveLength(0);
  });

  it('sets track list', () => {
    useStore.getState().setTracks([
      { id: '2', name: 'A' },
      { id: '3', name: 'B' },
    ]);
    expect(useStore.getState().tracks).toHaveLength(2);
    expect(useStore.getState().tracks[0].name).toBe('A');
  });
});

