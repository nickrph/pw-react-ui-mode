import { PlaywrightTestConfig, defineConfig, devices } from '@playwright/test';

const reporter: any[] = process.env.CI ? [['github']] : [['list']];

export const browserConfigs = {
  desktopChromium: {
    name: 'd-chrome',
    use: {
      browserName: 'chromium',
      viewport: { width: 1280, height: 720 },
    },
  },
  desktopSafari: {
    name: 'd-safari',
    use: {
      browserName: 'webkit',
      viewport: { width: 1280, height: 720 },
    },
  },
  desktopFirefox: {
    name: 'd-firefox',
    use: {
      browserName: 'firefox',
      viewport: { width: 1280, height: 720 },
    },
  },
  mobileChromium: {
    name: 'm-chrome',
    use: devices['Pixel 5'],
  },
  mobileSafari: {
    name: 'm-safari',
    use: devices['iPhone 13'],
  },
} satisfies Record<string, Pick<Required<PlaywrightTestConfig>['projects'][number], 'name' | 'use' | 'testIgnore'>>;

const baseProjects = Object.keys(browserConfigs).map(key => browserConfigs[key]!);

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  timeout: 4 * 60 * 1000,
  expect: {
    timeout: 2 * 60 * 1000,
    toHaveScreenshot: {
      animations: 'disabled',
    },
  },
  use: {
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    baseURL: process.env.URL ?? 'http://localhost:8080/',
  },
  webServer: {
    command: 'npm run docker:host',
    timeout: 3 * 60 * 1000,
    reuseExistingServer: !process.env.CI,
    port: +(process.env.PORT ?? 8080),
  },
  workers: process.env.CI ? 6 : undefined,
  retries: process.env.CI ? 3 : undefined,
  reporter: reporter,
  fullyParallel: true,
  maxFailures: process.env.CI ? 20 : undefined,
  projects: baseProjects,
});
