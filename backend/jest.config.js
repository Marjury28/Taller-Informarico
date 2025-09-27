export default {
  testEnvironment: "node",
  transform: {}, // ESM puro
  roots: ["<rootDir>/backend/tests"], // <<---- carpeta de pruebas
  testMatch: ["**/*.test.js"],
  moduleFileExtensions: ["js", "mjs"],
  verbose: true,
};
