import { create } from 'zustand';

export interface Track {
  id: string;
  name: string;
}

export interface AudioDevice {
  id: string;
  name: string;
}

interface StoreState {
  tracks: Track[];
  selectedDevice?: AudioDevice;
  addTrack: (track: Track) => void;
  removeTrack: (id: string) => void;
  setDevice: (device: AudioDevice) => void;
}

export const useStore = create<StoreState>((set) => ({
  tracks: [],
  selectedDevice: undefined,
  addTrack: (track) =>
    set((state) => ({ tracks: [...state.tracks, track] })),
  removeTrack: (id) =>
    set((state) => ({ tracks: state.tracks.filter((t) => t.id !== id) })),
  setDevice: (device) => set({ selectedDevice: device }),
}));

