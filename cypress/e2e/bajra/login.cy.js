describe("login to bajra", () => {
  beforeEach(() => {
    cy.visit("login");
  });
  it("Verify login using incorrect email and password", () => {
    cy.xpath("//input[@id='login']")
      .clear()
      .type(Cypress.env("incorrect_username"));
    cy.xpath("//input[@id='password']")
      .clear()
      .type(Cypress.env("incorrect_password"));
    cy.xpath("//button[normalize-space()='Log in']").click();
    cy.xpath("//p[@role='alert']").should(
      "include.text",
      "Wrong login/password"
    );
  });
  it("Verify login using correct email and password", () => {
    cy.xpath("//input[@id='login']").clear().type(Cypress.env("username"));
    cy.xpath("//input[@id='password']").clear().type(Cypress.env("password"));
    cy.xpath("//button[normalize-space()='Log in']").click();

    cy.xpath("//span[@class='oe_topbar_name']").should(
      "include.text",
      "Ascol Parajuli"
    );
  });
  it("Verify if reset link works", () => {
    cy.xpath("//a[normalize-space()='Reset Password']").click();
    cy.xpath("//label[normalize-space()='Your Email']").should(
      "have.text",
      "Your Email"
    );
  });
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});
