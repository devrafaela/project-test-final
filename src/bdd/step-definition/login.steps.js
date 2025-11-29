// ============================================================
// Step Definitions for Login Feature
// Conecta os cenários do .feature às ações de login
// ============================================================

import { Given, When, Then } from "@cucumber/cucumber";
import { AuthSystem } from "../auth.js";

// Instância compartilhada do AuthSystem
let authSystem = new AuthSystem();

console.log("[BDD DEBUG] loading login.steps.js");

// ============================================================
// GIVEN
// ============================================================

Given("I have a registered email for login {string}", async function (email) {
  const password = "StrongPassword123!";
  await authSystem.registerUser(email, password);
  this.password = password;
});

Given("I have no registered email for login", function () {
  authSystem.users = [];
  authSystem.saveUsers();
});

Given("I am logged in for login with email {string}", async function (email) {
  await authSystem.registerUser(email, "StrongPassword123!");
  await authSystem.login(email, "StrongPassword123!");
});

// ============================================================
// WHEN
// ============================================================

When("I attempt login with email {string} and password {string}", async function (email, password) {
  this.result = await authSystem.login(email, password);
});

When("I perform logout from login", function () {
  this.result = authSystem.logout();
});

// ============================================================
// THEN
// ============================================================

Then("I should be logged in successfully", function () {
  if (!authSystem.loggedInUser) throw new Error("User is not logged in");
});

Then("I should be logged out successfully", function () {
  if (authSystem.loggedInUser) throw new Error("User is still logged in");
});

Then("I should see error message {string}", function (message) {
  const mapping = {
    "E-mail não cadastrado": "not_found",
    "Senha incorreta": "wrong_password"
  };

  if (!this.result) throw new Error("No result from login");

  if (this.result.error !== mapping[message]) {
    throw new Error(`Expected: "${mapping[message]}", got: ${JSON.stringify(this.result)}`);
  }
});
