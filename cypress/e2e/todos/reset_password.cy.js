describe("Todo user forget password", () => {
  beforeEach(() => {
    cy.visit("login");
    cy.xpath("//input[@id='email']")
      .clear()
      .type("ascol.parajuli@bajratechnologies.com");
    cy.xpath("//input[@id='password']").clear().type("Aascol123.");
    cy.xpath("//button[normalize-space()='Login']").click();
    cy.xpath("//span[@class='header-user']").should("include.text", "AP");
    cy.visit("resetPassword");
  });
  //input fiend validation
  it("Verify if the input field is validated", () => {
    cy.xpath("//button[normalize-space()='Reset Password']").click();
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
    cy.xpath("//button[normalize-space()='Reset Password']").click();
    cy.on("window:alert", (t) => {
      //assertions
      expect(t).to.contains("Password Reset Sucessful");
    });
  });
});
