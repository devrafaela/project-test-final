// ============================================================
// Step Definitions para Registro de Usuário
// ============================================================

import { Given, When, Then } from '@cucumber/cucumber';
import { AuthSystem } from '../../bdd/auth.js';

let authSystem = new AuthSystem();

// ============================================================
// GIVEN
// ============================================================

// Página de registro
Given('que eu estou na página de registro', function () {
  // Apenas define contexto
});

// ============================================================
// WHEN
// ============================================================

// Registro de email
When('eu me registro com usuário {string} e senha {string}', function (email, password) {
  this.result = authSystem.registerUser(email, password);
});

// ============================================================
// THEN
// ============================================================

// Verifica se registro ocorreu
Then('minha conta deve ser criada', function () {
  if (!this.result) throw new Error('Conta não foi criada');
});
