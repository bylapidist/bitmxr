import { Slider, Text } from '@mantine/core';
import { useStore } from '../state/useStore';

export default function Mixer() {
  const tracks = useStore((state) => state.tracks);

  return (
    <div className="space-y-4">
      {tracks.map((track) => (
        <div key={track.id} className="flex items-center space-x-4">
          <Text className="w-24">{track.name}</Text>
          <Slider defaultValue={50} className="flex-1" />
        </div>
      ))}
      {tracks.length === 0 && (
        <Text className="text-sm text-gray-500">No tracks added</Text>
      )}
    </div>
  );
}
