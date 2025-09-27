// Comandos API robustos (no rompen si la ruta no existe o requiere auth)

Cypress.Commands.add("apiCreateTask", (overrides = {}) => {
  const path = Cypress.env("tasksPath") || "/api/tasks";

  const body = {
    titulo: "Tarea E2E " + Date.now(),
    prioridad: "MEDIA",
    ...overrides,
  };

  return cy.request({
    method: "POST",
    url: `${Cypress.env("api")}${path}`,
    body,
    failOnStatusCode: false, // no truena en 4xx
  });
});

Cypress.Commands.add("apiDeleteTask", (id) => {
  if (!id) {
    // devuelve objeto envuelto para no romper los .then
    return cy.wrap({ status: 0, body: null });
  }
  const path = Cypress.env("tasksPath") || "/api/tasks";
  return cy.request({
    method: "DELETE",
    url: `${Cypress.env("api")}${path}/${id}`,
    failOnStatusCode: false,
  });
});
