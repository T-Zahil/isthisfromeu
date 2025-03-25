import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.ts'],
    reporters: ['default', 'json'],
    outputFile: './vitest-result.json'
  }
})
