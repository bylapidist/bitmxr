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
});

