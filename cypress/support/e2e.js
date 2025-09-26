// cypress/support/e2e.js
// Lugar para hooks globales o comandos custom.
// Ejemplo de hook global para capturar errores no manejados del frontend
// y no romper el test por errores de consola controlados.
/*
Cypress.on("uncaught:exception", (err) => {
  // Devuelve false para evitar que Cypress falle el test por ese error
  // (ajústalo a tu caso; lo ideal es corregirlos).
  return false;
});
*/

// Puedes registrar comandos custom:
// import "./commands";
