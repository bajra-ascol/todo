const { defineConfig } = require("cypress");
const tagify = require("cypress-tags");

module.exports = defineConfig({
  projectId: "q9vhik",
  env: {
    username: "subin@hotmail.com",
    password: "Password1",
    invalid_username: "test1234",
    incorrect_username: "test1234@gmail.com",
    incorrect_password: "Test1234",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // config.env.CYPRESS_INCLUDE_TAGS = "my-feature";
      on("file:preprocessor", tagify(config));
    },
    // baseUrl: "https://bajratechnologies.com/web",
    baseUrl: "https://flamboyant-allen-00cf47.netlify.app/",
  },
});
