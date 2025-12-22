import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: 'tests/e2e',
    timeout: 120000,
    expect: { timeout: 10000 },
    fullyParallel: false,
    reporter: [['list']],
    use: {
        headless: true,
        viewport: { width: 1280, height: 800 },
        baseURL: 'http://localhost:3000'
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
    ],
    webServer: {
        command: 'pnpm --filter playground preview',
        url: 'http://localhost:3000',
        timeout: 5 * 60 * 1000,
        reuseExistingServer: !process.env.CI
    }
})
