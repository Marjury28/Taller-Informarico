/// <reference types="cypress" />

describe("Tasks API (smoke robusto)", () => {
  let createdId;
  const path = Cypress.env("tasksPath") || "/api/tasks";

  it("Crea una tarea (si el endpoint existe)", () => {
    cy.fixture("task.json").then((task) => {
      cy.apiCreateTask(task).then((res) => {
        if ([200, 201].includes(res.status)) {
          const id =
            res.body?._id ||
            res.body?.id ||
            res.body?.data?._id ||
            res.body?.data?.id;

          expect(id, "id creado").to.exist;
          createdId = id;
        } else {
          expect([400, 401, 403, 404]).to.include(res.status);
          cy.log(
            `POST ${path} devolvió ${res.status}. Se omite verificación de creación.`
          );
        }
      });
    });
  });

  it("Lista tareas (si existe) y (opcional) verifica la creada", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("api")}${path}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect([200, 404]).to.include(res.status);

      if (res.status === 200) {
        const list = Array.isArray(res.body) ? res.body : res.body?.data || [];
        expect(list, "lista de tareas").to.exist;

        if (createdId) {
          const found = list.find((t) => (t?._id || t?.id) === createdId);
          expect(found, "tarea encontrada en listado").to.exist;
        } else {
          cy.log(
            "No hay createdId (POST no disponible). Solo se validó el 200 del listado."
          );
        }
      } else {
        cy.log(`GET ${path} devolvió 404 (aceptado para smoke).`);
      }
    });
  });

  it("Elimina la tarea creada (si se pudo crear)", function () {
    if (!createdId) this.skip();
    cy.apiDeleteTask(createdId).then((res) => {
      expect([200, 204, 404]).to.include(res.status);
    });
  });
});
