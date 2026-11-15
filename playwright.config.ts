import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  // The four CI shards already run in parallel. One worker per shard limits
  // load on the shared public demo site.
  workers: isCI ? 1 : undefined,
  reporter: isCI
    ? [
        ['list'],
        ['blob'],
        ['junit', { outputFile: 'reports/junit.xml' }],
      ]
    : [['html', { open: 'on-failure' }]],
  use: {
    baseURL: process.env.BASE_URL?.trim() || 'https://practicesoftwaretesting.com',
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
