it("API /health responde 200", () => {
  cy.request(`${Cypress.env("apiUrl")}/health`).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.ok).to.eq(true);
  });
});
