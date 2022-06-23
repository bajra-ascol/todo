import moment from "moment";

var today_test_num;
var upcomming_test_num;
var due_test_num;

describe("Todo user forget password", () => {
  beforeEach(() => {
    cy.visit("login");
    cy.xpath("//input[@id='email']").clear().type(Cypress.env("username"));
    cy.xpath("//input[@id='password']").clear().type(Cypress.env("password"));
    cy.xpath("//button[normalize-space()='Login']").click();
    cy.xpath("//span[@class='header-user']").should("include.text", "SS");
  });

  //Create new list validation
  // it("Verify if input field of create list is validated", () => {
  //   cy.get("button[nztype='default']").click();
  //   cy.wait(2000);
  //   cy.get(
  //     ".mat-focus-indicator.new-list-btn.mat-raised-button.mat-button-base"
  //   ).click();
  //   cy.get(".invalid-text.ng-star-inserted").should(
  //     "include.text",
  //     "You must enter a value"
  //   );
  // });

  //Create a new list
  // it("Verify if create list is working", () => {
  //   cy.get("button[nztype='default']").click();
  //   cy.get("input[placeholder='Enter list name']").clear().type("Automation");
  //   cy.get("div[dir='ltr'] button:nth-child(2)").click();
  //   cy.get(
  //     "simple-snack-bar[class='mat-simple-snackbar ng-star-inserted'] span"
  //   ).should("include.text", "New List Added");
  // });

  // Create New Task for validation
  // it("Verify if create new task form is validated", () => {
  //   cy.get(
  //     "div[class='wrapper d-flex justify-content-between'] button[class='ant-btn ant-btn-primary']"
  //   ).click();
  //   cy.get("input[placeholder='Enter Task Name']")
  //     .clear()
  //     .type(" 17/06/2022 03:09 PM ");
  //   cy.get(
  //     ".mat-focus-indicator.new-task-btn.mat-raised-button.mat-button-base"
  //   ).click();
  //   cy.get(".mat-error.ng-star-inserted").should(
  //     "include.text",
  //     "Task Name is invalid"
  //   );
  // });

  // Create New Task
  // it("Verify if create new task form is working", () => {
  //   cy.get(
  //     "div[class='wrapper d-flex justify-content-between'] button[class='ant-btn ant-btn-primary']"
  //   ).click();
  //   cy.get("#taskName").clear().type("A Task");
  //   cy.get(
  //     "body > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > mat-dialog-container:nth-child(2) > app-new-task:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > mat-form-field:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
  //   ).click();
  //   cy.xpath("//span[normalize-space()='Personal']").click();
  //   cy.get(
  //     "body > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > mat-dialog-container:nth-child(2) > app-new-task:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(2) > mat-form-field:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
  //   ).click();
  //   cy.xpath("//span[normalize-space()='High']").click();
  //   cy.get("input[placeholder='start date']")
  //     .clear()
  //     .type(moment().format("YYYY-MM-DDThh:mm"));
  //   cy.get(
  //     ".mat-focus-indicator.new-task-btn.mat-raised-button.mat-button-base"
  //   ).click();
  //   cy.get(
  //     "simple-snack-bar[class='mat-simple-snackbar ng-star-inserted'] span"
  //   ).should("include.text", "Task Added Sucessfully");
  // });

  // overview
  it("Verify if today's task number increases if new task added", () => {
    cy.get(
      "body > app-root:nth-child(1) > app-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > app-overview:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > h1:nth-child(2)",
      { timeout: 5000 }
    ).then(($new_num) => {
      today_test_num = parseInt($new_num.text());
    });

    cy.get(
      "div[class='wrapper d-flex justify-content-between'] button[class='ant-btn ant-btn-primary']"
    ).click();
    cy.get("#taskName").clear().type("A Task");
    cy.get(
      "body > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > mat-dialog-container:nth-child(2) > app-new-task:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > mat-form-field:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
    ).click();
    cy.xpath("//span[normalize-space()='Personal']").click();
    cy.get(
      "body > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > mat-dialog-container:nth-child(2) > app-new-task:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(2) > mat-form-field:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
    ).click();
    cy.xpath("//span[normalize-space()='High']").click();
    cy.get("input[placeholder='start date']")
      .clear()
      .type(moment().format("YYYY-MM-DDThh:mm"));
    cy.get(
      ".mat-focus-indicator.new-task-btn.mat-raised-button.mat-button-base"
    ).click();

    cy.get(
      "body > app-root:nth-child(1) > app-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > app-overview:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > h1:nth-child(2)"
    ).should(($div) => {
      expect(parseInt($div.get(0).innerText)).to.greaterThan(today_test_num);
    });
  });

  it("Verify if Overdue Tasks number increases if new task added", () => {
    cy.wait(500);
    cy.get(
      "body > app-root:nth-child(1) > app-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > app-overview:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > h1:nth-child(2)"
    ).then(($new_num) => {
      due_test_num = parseInt($new_num.text());
    });
    cy.get(
      "div[class='wrapper d-flex justify-content-between'] button[class='ant-btn ant-btn-primary']"
    ).click();
    cy.get("#taskName").clear().type("A Task");
    cy.get(
      "body > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > mat-dialog-container:nth-child(2) > app-new-task:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > mat-form-field:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
    ).click();
    cy.xpath("//span[normalize-space()='Personal']").click();
    cy.get(
      "body > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > mat-dialog-container:nth-child(2) > app-new-task:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(2) > mat-form-field:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
    ).click();
    cy.xpath("//span[normalize-space()='High']").click();
    cy.get("input[placeholder='start date']")
      .clear()
      .type(moment().add("days", -1).format("YYYY-MM-DDThh:mm"));
    cy.get(
      ".mat-focus-indicator.new-task-btn.mat-raised-button.mat-button-base"
    ).click();

    cy.get(
      "body > app-root:nth-child(1) > app-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > app-overview:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > h1:nth-child(2)"
    ).should(($div) => {
      expect(parseInt($div.get(0).innerText)).to.greaterThan(due_test_num);
    });
  });

  it("Verify if upcomming Tasks number increases if new task added", () => {
    cy.wait(500);
    cy.get(
      "body > app-root:nth-child(1) > app-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > app-overview:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > h1:nth-child(2)"
    ).then(($new_num) => {
      upcomming_test_num = parseInt($new_num.text());
    });
    cy.get(
      "div[class='wrapper d-flex justify-content-between'] button[class='ant-btn ant-btn-primary']"
    ).click();
    cy.get("#taskName").clear().type("A Task");
    cy.get(
      "body > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > mat-dialog-container:nth-child(2) > app-new-task:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > mat-form-field:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
    ).click();
    cy.xpath("//span[normalize-space()='Personal']").click();
    cy.get(
      "body > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > mat-dialog-container:nth-child(2) > app-new-task:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(2) > mat-form-field:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
    ).click();
    cy.xpath("//span[normalize-space()='High']").click();
    cy.get("input[placeholder='start date']")
      .clear()
      .type(moment().add("days", -1).format("YYYY-MM-DDThh:mm"));
    cy.get(
      ".mat-focus-indicator.new-task-btn.mat-raised-button.mat-button-base"
    ).click();

    cy.get(
      "body > app-root:nth-child(1) > app-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > app-overview:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > h1:nth-child(2)"
    ).should(($div) => {
      expect(parseInt($div.get(0).innerText)).to.greaterThan(
        upcomming_test_num
      );
    });
  });

  // Logout
  // it("Verify if logout button works", () => {
  //   cy.xpath("(//button[@nztype='primary'])[1]").click();
  //   cy.get("body app-root app-home h1").should("include.text", "Home");
  // });
});
