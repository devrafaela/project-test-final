// ============================================================
// Step Definitions for User Registration
// Conecta os cenários do .feature às ações do sistema
// ============================================================

import { Given, When, Then } from "@cucumber/cucumber";
import { AuthSystem } from "../auth.js";

console.log("[BDD DEBUG] loading register.steps.js");

// Instância compartilhada do AuthSystem
let authSystem = new AuthSystem();

// ============================================================
// HELPERS (interno)
// ============================================================

// Normalize username: if it's not an email, make a test email
function normalizeToEmail(username) {
  if (typeof username !== "string") return username;
  return username.includes("@") ? username : `${username}@example.com`;
}

// ============================================================
// GIVEN
// ============================================================

// Start the registration page with a clean state for this scenario
Given("I am on the registration page", function () {
  authSystem.resetSystem(); // garante ambiente limpo APENAS aqui
  console.log("[BDD DEBUG] registered step: on registration page");
});

// Have a pre-registered account (useful for negative tests)
Given("I have a registered email {string}", async function (usernameOrEmail) {
  const email = normalizeToEmail(usernameOrEmail);
  // Use registerUser (hash + validations) to keep consistency
  this.result = await authSystem.registerUser(email, "StrongPassword123!");
  console.log("[BDD DEBUG] registered step: pre-registered email ->", email, "result:", this.result);
});

// No registered email (clears system users)
Given("I have no registered email", function () {
  // don't call resetSystem everywhere — keep this explicit step to clear users
  authSystem.resetSystem();
  console.log("[BDD DEBUG] registered step: no email registered");
});

// Convenience: create and login a user for scenarios that need a logged user
Given("I am logged in with email {string}", async function (usernameOrEmail) {
  const email = normalizeToEmail(usernameOrEmail);
  await authSystem.registerUser(email, "StrongPassword123!");
  await authSystem.login(email, "StrongPassword123!");
  console.log("[BDD DEBUG] registered step: user logged in ->", email);
});

// ============================================================
// WHEN
// ============================================================

When("I register with username {string} and password {string}", async function (username, password) {
  // allow username without @ by normalizing
  const email = normalizeToEmail(username);
  this.result = await authSystem.registerUser(email, password);
  console.log("[BDD DEBUG] registered step: registration attempted ->", email, "result:", this.result);
});

When("I login with email {string} and password {string}", async function (email, password) {
  this.result = await authSystem.login(email, password);
  console.log("[BDD DEBUG] registered step: login attempted ->", email, "result:", this.result);
});

When("I logout", function () {
  this.result = authSystem.logout();
  console.log("[BDD DEBUG] registered step: logout attempted");
});

// ============================================================
// THEN
// ============================================================

Then("my account should be created", function () {
  if (!this.result || !this.result.success) {
    throw new Error("Account registration failed — result: " + JSON.stringify(this.result));
  }
  console.log("[BDD DEBUG] registered step: account created");
});

Then("I should be logged in", function () {
  if (!authSystem.loggedInUser) throw new Error("User not logged in");
  console.log("[BDD DEBUG] registered step: user logged in");
});

Then("I should be logged out", function () {
  if (authSystem.loggedInUser) throw new Error("User still logged in");
  console.log("[BDD DEBUG] registered step: user logged out");
});

Then("I should see {string}", function (message) {
  if (!this.result || this.result.error !== message) {
    throw new Error(`Expected: ${message} — Received: ${JSON.stringify(this.result)}`);
  }
  console.log("[BDD DEBUG] registered step: message checked");
});

