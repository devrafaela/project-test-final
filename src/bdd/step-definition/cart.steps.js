// ============================================================
// Step Definitions for Cart Scenarios
// Inclui funcionalidades de adicionar itens e calcular total
// ============================================================

import { Given, When, Then } from '@cucumber/cucumber';
import { AuthSystem } from '../auth.js';

let authSystem = new AuthSystem();

console.log("[BDD DEBUG] loading cart.steps.js");

// ============================================================
// GIVEN
// ============================================================

Given('I am logged in for cart with email {string}', async function (email) {
  await authSystem.registerUser(email, "StrongPassword123!");
  await authSystem.login(email, "StrongPassword123!");
  console.log("[BDD DEBUG] registered step: user logged in for cart");
});

// ============================================================
// WHEN
// ============================================================

When('I add {string} with price {int} to cart', function (item, price) {
  authSystem.addMarketItem(item, price);
  console.log(`[BDD DEBUG] added item: ${item} at price ${price}`);
});

// ============================================================
// THEN
// ============================================================

Then('the total in cart should be {int}', function (expected) {
  if (authSystem.getMarketTotal() !== expected)
    throw new Error(`Incorrect total: Expected ${expected}, got ${authSystem.getMarketTotal()}`);
  console.log("[BDD DEBUG] total verified");
});
