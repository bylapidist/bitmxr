import { Button, Select, Text } from '@mantine/core';
import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import { z } from 'zod';
import { useStore } from '../state/useStore';

const schema = z.object({ device: z.string().nonempty('Device is required') });

interface Props {
  devices: string[];
}

export default function DeviceSelector({ devices }: Props) {
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const setDevice = useStore((state) => state.setDevice);

  const handleSubmit = async () => {
    try {
      const { device } = schema.parse({ device: value ?? '' });
      try {
        await invoke('set_audio_device', { id: device });
      } catch {
        // ignore invoke errors in non-tauri environments
      }
      setDevice({ id: device, name: device });
      setError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message || 'Invalid device');
      }
    }
  };

  return (
    <div>
      <Select
        data={devices}
        value={value}
        onChange={setValue}
        placeholder="Select device"
      />
      <Button onClick={handleSubmit} className="mt-2">
        Set Device
      </Button>
      {error && (
        <Text color="red" size="sm" className="mt-1">
          {error}
        </Text>
      )}
    </div>
  );
}
