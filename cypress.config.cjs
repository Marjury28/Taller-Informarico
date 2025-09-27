const { defineConfig } = require("cypress");

// Cambia aquí si usas 5174
const FRONT = process.env.FRONT_URL || "http://localhost:5176";
const API = process.env.API_URL || "http://localhost:5001";

module.exports = defineConfig({
  e2e: {
    baseUrl: FRONT,
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    video: false,
    chromeWebSecurity: false,
    defaultCommandTimeout: 8000,
    retries: { runMode: 1, openMode: 0 },
    env: {
      api: API,
      front: FRONT,
      tasksPath: "/api/tasks",
    },
  },
});
