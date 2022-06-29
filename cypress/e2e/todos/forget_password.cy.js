describe("Todo user forget password", () => {
  beforeEach(() => {
    cy.visit("forgotPassword");
  });

  //   Invalid Email
  it("Verify if invalid email can be used to forget password", () => {
    cy.get("#email").clear().type(Cypress.env("invalid_username"));
    cy.get(".btn").click();
    cy.get(".invalid-text.text-error").should(
      "include.text",
      "Please Enter Valid Email"
    );
  });

  //   wrong Email
  it("Verify if valid email can be used to forget password", () => {
    cy.get("#email").clear().type(Cypress.env("incorrect_username"));
    cy.get(".btn").click();
    cy.get(".message").should("include.text", "Email doesnot exist");
  });

  //   working Email
  it("Verify if valid email can be used to forget password", () => {
    cy.get("#email").clear().type(Cypress.env("invalid_username"));
    cy.get(".btn").click();
    cy.on("window:confirm", () => {
      cy.xpath(
        "//mat-dialog-container[@class='mat-dialog-container ng-tns-c50-14 ng-trigger ng-trigger-dialogContainer ng-star-inserted']//h1[contains(text(),'Email has been sent!')]"
      ).should("include.text", "Email has been sent!");
    });
  });

  // login link
  it("Verify if 'Login' link works", () => {
    cy.get(".login-link").click();
    cy.get("div[class='form-title'] h2").should(
      "include.text",
      "Login to your account"
    );
  });
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});
