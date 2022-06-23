describe("Todo user login", () => {
  beforeEach(() => {
    cy.visit("login");
  });

  //Invalid / Empty field
  it("Verify login using invalid email format", () => {
    cy.xpath("//input[@id='email']")
      .clear()
      .type(Cypress.env("invalid_username"));
    cy.xpath("//div[@class='container-left']//div[1]//div[1]").should(
      "include.text",
      "Invalid Input"
    );
  });

  // incorrect email and password
  it("Verify login using incorrect email and password", () => {
    cy.xpath("//input[@id='email']")
      .clear()
      .type(Cypress.env("incorrect_username"));
    cy.xpath("//input[@id='password']")
      .clear()
      .type(Cypress.env("incorrect_password"));
    cy.xpath("//button[normalize-space()='Login']").click();
    cy.get(
      "body > app-root:nth-child(1) > app-login:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(6)"
    ).should("include.text", "Incorrect Email Address !");
  });

  // All Correct
  it("Verify login using correct email and password", () => {
    cy.xpath("//input[@id='email']").clear().type(Cypress.env("username"));
    cy.xpath("//input[@id='password']").clear().type(Cypress.env("password"));
    cy.xpath("//button[normalize-space()='Login']").click();
    cy.xpath("//span[@class='header-user']").should("include.text", "SS");
  });

  // Forgot password
  it("Verify if 'forgot passoword' link works", () => {
    cy.xpath("//a[normalize-space()='Forgot Password?']").click();
    cy.xpath("//h2[normalize-space()='Forgot your password ?']").should(
      "have.text",
      "Forgot your password ?"
    );
  });

  // Create new user
  it("Verify if 'Create New account' link works", () => {
    cy.xpath("//a[normalize-space()='Create New account']").click();
    cy.xpath("//body//app-root//h2[1]").should(
      "have.text",
      "Let's get started"
    );
  });
  
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});
