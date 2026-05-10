import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",

    testTimeout: 15_000,

    globalSetup: ["./src/__tests__/global-setup.ts"],

    setupFiles: ["./src/__tests__/vitest.setup.ts"],
  },
});
