// jest.config.js
export default {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  moduleFileExtensions: ["js", "json"],
  transform: {},
  verbose: true,
  collectCoverageFrom: ["backend/**/*.js", "!**/node_modules/**"],
};
