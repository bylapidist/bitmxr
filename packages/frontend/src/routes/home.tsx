import { Button, Text } from '@mantine/core';
import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';
import TrackList from '../components/TrackList';
import Mixer from '../components/Mixer';
import DeviceSelector from '../components/DeviceSelector';
import { useStore } from '../state/useStore';

export default function Home() {
  const [stats, setStats] = useState<string>('');
  const [devices, setDevices] = useState<string[]>([]);
  const selected = useStore((state) => state.selectedDevice);

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

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bitmxr</h1>
      <Button onClick={getStats} className="mr-2">Get Audio Stats</Button>
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
