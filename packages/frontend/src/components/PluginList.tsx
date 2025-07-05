import { Button, Table, Text } from '@mantine/core';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';

export interface Plugin {
  name: string;
  path: string;
}

export default function PluginList() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);

  const fetchPlugins = async () => {
    try {
      const result = await invoke<Plugin[]>('list_plugins');
      setPlugins(result);
    } catch {
      // ignore invoke errors in non-tauri environments
    }
  };

  useEffect(() => {
    fetchPlugins();
  }, []);

  return (
    <div>
      <Button onClick={fetchPlugins} className="mb-2">
        Rescan
      </Button>
      <Table withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Path</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {plugins.map((p) => (
            <Table.Tr key={p.path}>
              <Table.Td>{p.name}</Table.Td>
              <Table.Td>{p.path}</Table.Td>
            </Table.Tr>
          ))}
          {plugins.length === 0 && (
            <Table.Tr>
              <Table.Td colSpan={2}>
                <Text c="dimmed">No plugins found</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </div>
  );
}
