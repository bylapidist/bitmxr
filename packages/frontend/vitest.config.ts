import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mantine/notifications': './tests/__mocks__/mantine-notifications.ts',
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts?(x)'],
    globals: true,
    coverage: {
      reporter: ['text', 'json-summary', 'html'],
      include: ['src/**/*.{ts,tsx}'],
    },
  },
});
