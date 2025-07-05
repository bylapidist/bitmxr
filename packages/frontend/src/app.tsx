import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import PluginList from './components/PluginList';

export default function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plugins" element={<PluginList />} />
      </Routes>
    </MantineProvider>
  );
}
