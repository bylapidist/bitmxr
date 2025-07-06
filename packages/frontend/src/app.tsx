import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import PluginList from './components/PluginList';
import { useStore } from './state/useStore';

export default function App() {
  const scheme = useStore((s) => s.colorScheme);
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles theme={{ colorScheme: scheme }}>
      <Notifications />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plugins" element={<PluginList />} />
      </Routes>
    </MantineProvider>
  );
}
