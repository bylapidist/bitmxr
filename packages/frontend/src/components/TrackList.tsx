import { Button, Text } from '@mantine/core';
import { useStore } from '../state/useStore';

export default function TrackList() {
  const tracks = useStore((state) => state.tracks);
  const addTrack = useStore((state) => state.addTrack);
  const removeTrack = useStore((state) => state.removeTrack);

  const handleAdd = () => {
    addTrack({ id: Date.now().toString(), name: `Track ${tracks.length + 1}` });
  };

  return (
    <div>
      <Button onClick={handleAdd} className="mb-2">
        Add Track
      </Button>
      <ul className="space-y-1 list-disc pl-4">
        {tracks.map((t) => (
          <li key={t.id} className="flex items-center justify-between">
            <Text>{t.name}</Text>
            <Button size="xs" variant="subtle" onClick={() => removeTrack(t.id)}>
              remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
