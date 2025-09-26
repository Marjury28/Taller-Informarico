// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // ⇦ ajusta si tu frontend usa otro puerto
    env: {
      apiUrl: "http://localhost:5000", // ⇦ ajusta si tu backend usa otro puerto
    },
    video: false,
  },
});
