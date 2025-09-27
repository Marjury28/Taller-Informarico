describe("API Health", () => {
  it("GET /health responde 200/204", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("api")}/health`,
      failOnStatusCode: false,
    }).then((res) => {
      expect([200, 204]).to.include(res.status);
    });
  });
});
