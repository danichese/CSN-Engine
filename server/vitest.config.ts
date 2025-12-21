import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/tests/**/*.test.ts'],
    },
  },
});
