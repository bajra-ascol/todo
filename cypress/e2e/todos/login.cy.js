describe("Todo user login", () => {
  beforeEach(() => {
    cy.visit("login");
  });

  //Invalid / Empty field
  it("Verify login using invalid email format", () => {
    cy.get("#email").clear().type(Cypress.env("invalid_username"));
    cy.get(
      "body > app-root:nth-child(1) > app-login:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(4)"
    ).should("include.text", "Invalid Input");
  });

  // incorrect email and password
  it("Verify login using incorrect email and password", () => {
    cy.get("#email").clear().type(Cypress.env("incorrect_username"));
    cy.get("#password").clear().type(Cypress.env("incorrect_password"));
    cy.get(".btn").click();
    cy.get(
      "body > app-root:nth-child(1) > app-login:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(6)"
    ).should("include.text", "Incorrect Email Address !");
  });

  // All Correct
  it("Verify login using correct email and password", () => {
    cy.get("#email").clear().type(Cypress.env("username"));
    cy.get("#password").clear().type(Cypress.env("password"));
    cy.get(".btn").click();
    cy.get(".header-user").should("include.text", "SS");
  });

  // Forgot password
  it("Verify if 'forgot passoword' link works", () => {
    cy.get(".forgot-password").click();
    cy.get("div[class='form-title'] h2").should(
      "have.text",
      "Forgot your password ?"
    );
  });

  // Create new user
  it("Verify if 'Create New account' link works", () => {
    cy.get("a[routerlink='/signUp']").click();
    cy.get("body app-root h2:nth-child(1)").should(
      "have.text",
      "Let's get started"
    );
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});
