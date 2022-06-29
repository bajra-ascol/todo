describe("Todo user reset password", () => {
  beforeEach(() => {
    cy.visit("login");
    cy.get("#email").clear().type("ascol.parajuli@bajratechnologies.com");
    cy.get("#password").clear().type("Aascol123.");
    cy.get(".btn").click();
    cy.get(".header-user").should("include.text", "AP");
    cy.visit("resetPassword");
  });
  //input fiend validation
  it("Verify if the input field is validated", () => {
    cy.get(".btn").click();
    cy.on("window:alert", (t) => {
      //assertions
      expect(t).to.contains("Password  invalid");
    });
  });
  // working reset password
  it("Verify if reset password works", () => {
    cy.get("input[placeholder='Enter Your New Password']")
      .clear()
      .type("Aascol123.");
    cy.get("input[placeholder='Confirm Your Password']")
      .clear()
      .type("Aascol123.");
    cy.get(".btn").click();
    cy.on("window:alert", (t) => {
      //assertions
      expect(t).to.contains("Password Reset Sucessful");
    });
  });
});
