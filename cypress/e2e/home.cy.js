// Test UI básico: verifica que la app carga y muestra un título o elemento clave.
describe("Home", () => {
  it("carga la página y muestra el título", () => {
    cy.visit("/");

    // Opción A: texto visible (ajusta a tu UI real)
    cy.contains(/taskmaster/i);

    // Opción B: selector estable si usas data-testid
    // cy.get('[data-testid="app-title"]').should("be.visible");
  });
});
