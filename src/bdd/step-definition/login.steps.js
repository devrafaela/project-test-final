// ============================================================
// Step Definitions para Cenários de Login
// Conecta a feature de login com a lógica do sistema
// ============================================================

import { Given, When, Then } from '@cucumber/cucumber';
import { AuthSystem } from '../../bdd/auth.js';

// Instancia o sistema (compartilhado entre steps)
let authSystem = new AuthSystem();

// ============================================================
// GIVEN
// ============================================================

// Email cadastrado
Given('que eu tenho um email {string} cadastrado', function (email) {
  authSystem.users.push({ email, password: 'Senha123!' });
});

// Sem email cadastrado
Given('que eu não tenho email cadastrado', function () {
  authSystem.users = [];
});

// Usuário logado
Given('que eu estou logado com email {string}', async function (email) {
  authSystem.users.push({ email, password: 'Senha123!' });
  await authSystem.login(email, 'Senha123!');
});

// ============================================================
// WHEN
// ============================================================

// Faz login
When('eu faço login com email {string} e senha {string}', async function (email, password) {
  this.result = await authSystem.login(email, password);
});

// Faz logout
When('eu faço logout', function () {
  this.result = authSystem.logout();
});

// ============================================================
// THEN
// ============================================================

// Verifica login bem-sucedido
Then('eu devo estar logado', function () {
  if (!authSystem.loggedInUser) throw new Error('Não está logado');
});

// Verifica login falho ou usuário não logado
Then('eu não devo estar logado', function () {
  if (authSystem.loggedInUser) throw new Error('Está logado inesperadamente');
});

// Verifica logout
Then('eu devo estar deslogado', function () {
  if (authSystem.loggedInUser) throw new Error('Ainda está logado');
});

// Verifica mensagem de erro específica
Then('eu devo ver {string}', function (message) {
  if (!this.result || this.result.error !== message) throw new Error(`Mensagem esperada: ${message}, mas foi: ${JSON.stringify(this.result)}`);
});
