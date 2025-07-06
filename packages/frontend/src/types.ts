import type { Track } from './state/useStore';

export interface Project {
  version: number;
  tracks: Track[];
}
