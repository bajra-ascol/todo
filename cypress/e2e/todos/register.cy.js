describe("Todo user register", () => {
  beforeEach(() => {
    cy.visit("signUp");
  });

  // Empty field
  it("Verify if important field is required", () => {
    cy.get(".btn").click();
    cy.get(
      "body > app-root:nth-child(1) > app-signup-page:nth-child(2) > app-signup:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)"
    ).should("include.text", "Name is Required");
  });

  //Invalid Name
  it("Verify if name input field is validated", () => {
    cy.get("#name").clear().type("ascol123");
    cy.get(
      "body > app-root:nth-child(1) > app-signup-page:nth-child(2) > app-signup:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2)"
    ).should("include.text", "Name can only contain letters");
  });

  //Invalid DOB
  it("Verify if DOB input is validated with invalid date", () => {
    cy.get("#mat-input-0").clear().type("123123123");
    cy.get(".invalid-text.text-error.ng-star-inserted").should(
      "include.text",
      "Date of Birth is Required"
    );
  });

  //Invalid phone
  it("Verify if phone input field is validated", () => {
    cy.get("#phone").clear().type("111111111111");
    cy.get(".btn").click();
    cy.xpath("//div[contains(text(),'Please Enter Valid Phone')]").should(
      "include.text",
      "Please Enter Valid Phone"
    );
  });

  //   Invalid Email
  it("Verify if email field is validated", () => {
    cy.get("#email").clear().type(Cypress.env("invalid_username"));
    cy.get(".btn").click();
    cy.xpath("//div[contains(text(),'Please Enter Valid Email')]").should(
      "include.text",
      "Please Enter Valid Email"
    );
  });

  //Already used email
  it("Verify if already used email can be used again to register user", () => {
    cy.get("#email").clear().type(Cypress.env("username"));
    cy.get(".btn").click();
    cy.xpath("//div[contains(text(),'Please Enter Valid Email')]").should(
      "include.text",
      "Email already used"
    );
  });

  //All correct info
  it("Verify if register works properly with valid data", () => {
    cy.get("#name").clear().type("Ascol Parajuli");
    cy.get("#mat-radio-2").click();
    cy.get("#mat-input-0").clear().type("6/1/2022");
    cy.get("#phone").clear().type("1111111111");
    cy.get("#email").clear().type("ascol.parajuli@bajratechnologies.com");
    cy.get(".btn").click();
    cy.xpath("//p[normalize-space()='Set Your Password!']").should(
      "include.text",
      "Set Your Password!"
    );
  });

  //Validate password using empty field
  it("Verify if password input field is required", () => {
    cy.get("#name").clear().type("Ascol Parajuli");
    cy.get("#mat-radio-2").click();
    cy.get("#mat-input-0").clear().type("6/1/2022");
    cy.get("#phone").clear().type("1111111111");
    cy.get("#email").clear().type("ascol.parajuli@bajratechnologies.com");
    cy.get(".btn").click();
    cy.xpath("//button[normalize-space()='Sign up']").click();
    cy.on("window:alert", (t) => {
      //assertions
      expect(t).to.contains("Password  invalid");
    });
  });

  //Check password field valid password
  it("Verify if password field is validated", () => {
    cy.get("#name").clear().type("Ascol Parajuli");
    cy.get("#mat-radio-2").click();
    cy.get("#mat-input-0").clear().type("6/1/2022");
    cy.get("#phone").clear().type("1111111111");
    cy.get("#email").clear().type("ascol.parajuli@bajratechnologies.com");
    cy.get(".btn").click();
    cy.get("input[placeholder='Enter Your New Password']")
      .clear()
      .type("Aascol123.");
    cy.get("input[placeholder='Confirm Your Password']")
      .clear()
      .type("Aascol123.");
    cy.xpath("//button[normalize-space()='Sign up']").click();
    cy.get(".header-user").should("include.text", "AP");
  });

  // login link
  it("Verify if 'Login' link works", () => {
    cy.get("a[routerlink='/login']").click();
    cy.get("div[class='form-title'] h2").should(
      "include.text",
      "Login to your account"
    );
  });
});
