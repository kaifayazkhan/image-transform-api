import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/node_modules/**', 'vite.config.mts'],
    },
    globals: true,
    restoreMocks: true,
    environment: 'node',
    env: {
      NODE_ENV: 'development',
    },
  },
});
