// ============================================================
// Step Definitions para Cenários de Carrinho
// Inclui funcionalidades de adicionar itens e calcular total
// ============================================================

import { Given, When, Then } from '@cucumber/cucumber';
import { AuthSystem } from '../../bdd/auth.js';

let authSystem = new AuthSystem();

// ============================================================
// GIVEN
// ============================================================

// Usuário logado com email
Given('que eu estou logado com email {string}', async function (email) {
  authSystem.users.push({ email, password: 'Senha123!' });
  await authSystem.login(email, 'Senha123!');
});

// ============================================================
// WHEN
// ============================================================

// Adiciona item genérico ao carrinho
When('eu adiciono {string} ao carrinho', function (item) {
  this.result = authSystem.addToCart(item);
});

// Adiciona item com preço (itens aleatórios)
When('eu adiciono {string} com preço {int}', function (item, price) {
  authSystem.addMarketItem(item, price);
});

// ============================================================
// THEN
// ============================================================

// Verifica se item está no carrinho
Then('o carrinho deve conter {string}', function (item) {
  if (!authSystem.cart || !authSystem.cart.includes(item))
    throw new Error('Item não está no carrinho');
});

// Verifica total do carrinho
Then('o total deve ser {int}', function (expected) {
  if (authSystem.getMarketTotal() !== expected)
    throw new Error('Total incorreto');
});
