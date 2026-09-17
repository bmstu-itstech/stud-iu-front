import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [
        ['github'],
        ['html', { open: 'never' }],
        ['allure-playwright', { resultsDir: 'allure-results' }],
      ]
    : [['list'], ['allure-playwright', { resultsDir: 'allure-results' }]],
  use: {
    baseURL: 'http://localhost:5174',
    trace: 'retain-on-failure',
    testIdAttribute: 'data-test-id',
  },
  webServer: {
    command: 'bun run dev --port 5174 --strictPort',
    url: 'http://localhost:5174',
    reuseExistingServer: false,
    timeout: 60_000,
    env: { ...process.env, VITE_ENABLE_MOCKS: 'true' },
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] },
    },
  ],
})
