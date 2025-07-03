import { Button } from '@mantine/core';
import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';

export default function Home() {
  const [stats, setStats] = useState<string>('');

  async function getStats() {
    const result = await invoke<string>('get_audio_stats');
    setStats(result);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bitmxr</h1>
      <Button onClick={getStats}>Get Audio Stats</Button>
      {stats && <p className="mt-2">{stats}</p>}
    </div>
  );
}
