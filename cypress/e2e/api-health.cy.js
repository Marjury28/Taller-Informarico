// cypress/e2e/api-health.cy.js
// Testea el endpoint /health del backend (sin pasar por el frontend).
describe("API /health", () => {
  it("responde 200 y ok:true", () => {
    cy.request(`${Cypress.env("apiUrl")}/health`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("ok", true);
    });
  });
});
