describe(["my-feature"], "Google Test Suite", () => {
  beforeEach(() => {
    cy.visit("https://www.google.com");
  });

  it(["wip1"], "Verify search", () => {
    cy.xpath("//input[@title='खोज']").type("Anime");
    cy.get(".gNO89b").first().click();
    // cy.wait(2000);
    cy.get("#hdtb-tls").should("have.text", "उपकरणहरू");
  });
  it(["wip2"], "Verify search", () => {
    cy.xpath("//input[@title='खोज']").type("One Piece");
    cy.get(".gNO89b").first().click();
    // cy.wait(2000);
    cy.get("#hdtb-tls").should("have.text", "उपकरणहरू");
  });
});
