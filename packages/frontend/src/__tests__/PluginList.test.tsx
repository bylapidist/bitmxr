import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MantineProvider } from '@mantine/core';
import PluginList from '../components/PluginList';
import { invoke } from '@tauri-apps/api/core';

vi.mock('@tauri-apps/api/core', () => ({ invoke: vi.fn() }));

const mockedInvoke = vi.mocked(invoke);

describe('PluginList', () => {
  beforeAll(() => {
    class RO {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    // @ts-expect-error -- polyfill for testing
    global.ResizeObserver = RO;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders plugins from invoke', async () => {
    mockedInvoke.mockResolvedValueOnce([
      { name: 'Test', path: '/test.vst3' },
    ]);
    render(
      <MantineProvider>
        <PluginList />
      </MantineProvider>
    );
    expect(await screen.findByText('Test')).toBeTruthy();
    expect(screen.getByText('/test.vst3')).toBeTruthy();
  });

  it('rescans when button clicked', async () => {
    mockedInvoke.mockResolvedValueOnce([]);
    render(
      <MantineProvider>
        <PluginList />
      </MantineProvider>
    );

    mockedInvoke.mockResolvedValueOnce([
      { name: 'Other', path: '/other.vst3' },
    ]);

    fireEvent.click(screen.getAllByRole('button', { name: /rescan/i })[0]);
    expect(await screen.findByText('Other')).toBeTruthy();
  });
});
