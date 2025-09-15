import { defineConfig, devices } from "@playwright/test";
import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("base url", process.env.FRONTEND_URL);
const workers = process.env.PLAYWRIGHT_WORKERS
  ? parseInt(process.env.PLAYWRIGHT_WORKERS)
  : 1;

const retries = process.env.PLAYWRIGHT_RETRIES
  ? parseInt(process.env.PLAYWRIGHT_RETRIES)
  : 1;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: true,
  retries,
  workers,
  reporter: "html",
  use: {
    baseURL: process.env.FRONTEND_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
