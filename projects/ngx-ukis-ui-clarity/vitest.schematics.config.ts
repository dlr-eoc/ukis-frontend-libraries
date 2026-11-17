import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    root: './',
    globals: true,
    environment: 'node',
    include: ['schematics/**/*_spec.ts'],
    exclude: ['**/files/**/*'],
    typecheck: {
      tsconfig: 'tsconfig.schematics.json'
    }
  }
});