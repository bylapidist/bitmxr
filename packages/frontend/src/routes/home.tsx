import { Button, Text } from '@mantine/core';
import { invoke } from '@tauri-apps/api/core';
import { open, save } from '@tauri-apps/plugin-dialog';
import type { Project } from '../types';
import { useEffect, useState } from 'react';
import TrackList from '../components/TrackList';
import Mixer from '../components/Mixer';
import DeviceSelector from '../components/DeviceSelector';
import ThemeToggle from '../components/ThemeToggle';
import { useStore } from '../state/useStore';

export default function Home() {
  const [stats, setStats] = useState<string>('');
  const [devices, setDevices] = useState<string[]>([]);
  const selected = useStore((state) => state.selectedDevice);
  const tracks = useStore((state) => state.tracks);
  const setTracks = useStore((state) => state.setTracks);

  async function getStats() {
    const result = await invoke<string>('get_audio_stats');
    setStats(result);
  }

  async function getDevices() {
    try {
      const result = await invoke<string[]>('list_audio_devices');
      setDevices(result);
    } catch {
      // ignore errors in non-tauri environments
    }
  }

  async function handleSave() {
    try {
      const path = await save({ filters: [{ name: 'Bitmxr Project', extensions: ['bmxr'] }] });
      if (!path) return;
      await invoke('save_project', { path, project: { version: 1, tracks } });
    } catch {
      // ignore errors in non-tauri environments
    }
  }

  async function handleLoad() {
    try {
      const path = await open({ filters: [{ name: 'Bitmxr Project', extensions: ['bmxr'] }] });
      if (!path || Array.isArray(path)) return;
      const project = await invoke<Project>('load_project', { path });
      setTracks(project.tracks);
    } catch {
      // ignore errors in non-tauri environments
    }
  }

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Bitmxr</h1>
        <ThemeToggle />
      </div>
      <div className="space-x-2 mb-2">
        <Button onClick={getStats}>Get Audio Stats</Button>
        <Button onClick={handleSave}>Save Project</Button>
        <Button onClick={handleLoad}>Load Project</Button>
      </div>
      {stats && <p className="mt-2">{stats}</p>}
      <div className="mt-4">
        <DeviceSelector devices={devices} />
        <Text className="mt-2">
          Current Device: {selected ? selected.name : 'None'}
        </Text>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <TrackList />
        <Mixer />
      </div>
    </div>
  );
}
