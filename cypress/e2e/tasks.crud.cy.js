describe("/api/tasks CRUD mínimo", () => {
  let createdId;
  it("GET /api/tasks → 200 y array", () => {
    cy.request(`${Cypress.env("apiUrl")}/api/tasks`).then((r) => {
      expect(r.status).to.eq(200);
      const data = r.body?.data ?? r.body;
      expect(Array.isArray(data)).to.eq(true);
    });
  });
  it("POST /api/tasks → 201 crea", () => {
    cy.request("POST", `${Cypress.env("apiUrl")}/api/tasks`, {
      title: "Tarea Cypress",
      description: "Creada por E2E",
    }).then((r) => {
      expect(r.status).to.eq(201);
      const t = r.body?.data ?? r.body;
      createdId = t._id || t.id;
      expect(createdId).to.be.ok;
    });
  });
  it("GET /api/tasks/:id → 200", () => {
    expect(createdId).to.be.ok;
    cy.request(`${Cypress.env("apiUrl")}/api/tasks/${createdId}`).then((r) => {
      expect(r.status).to.eq(200);
      const b = r.body?.data ?? r.body;
      expect(b._id || b.id).to.eq(createdId);
    });
  });
  it("DELETE /api/tasks/:id → 204/200", () => {
    expect(createdId).to.be.ok;
    cy.request("DELETE", `${Cypress.env("apiUrl")}/api/tasks/${createdId}`).then((r) => {
      expect([200, 204]).to.include(r.status);
    });
  });
});
