import { Button } from '@mantine/core';
import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import TrackList from '../components/TrackList';
import Mixer from '../components/Mixer';

export default function Home() {
  const [stats, setStats] = useState<string>('');
  const [devices, setDevices] = useState<string[]>([]);

  async function getStats() {
    const result = await invoke<string>('get_audio_stats');
    setStats(result);
  }

  async function getDevices() {
    const result = await invoke<string[]>('list_audio_devices');
    setDevices(result);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bitmxr</h1>
      <Button onClick={getStats} className="mr-2">Get Audio Stats</Button>
      <Button onClick={getDevices}>List Audio Devices</Button>
      {stats && <p className="mt-2">{stats}</p>}
      {devices.length > 0 && (
        <ul className="mt-2 list-disc list-inside">
          {devices.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <TrackList />
        <Mixer />
      </div>
    </div>
  );
}
