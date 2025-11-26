// Step Definitions para Cenários de Login
// Implementa os passos dos cenários Gherkin em código JS
// Usa Cucumber.js para conectar cenários a lógica

import { Given, When, Then } from '@cucumber/cucumber';  // Importa hooks do Cucumber
import { AuthSystem } from '../auth.js';  // Importa a classe do sistema

// Instancia o sistema de autenticação (compartilhado entre cenários)
let authSystem = new AuthSystem();

// Passo Dado: Usuário registrado
Given('que eu me registrei com usuário {string} e senha {string}', function (username, password) {
  // Registra o usuário no sistema
  authSystem.registerUser(username, password);
});

// Passo Dado: Usuário não registrado
Given('que eu não me registrei', function () {
  // Não faz nada, pois o sistema começa vazio
});

// Passo Dado: Usuário logado
Given('que eu estou logado com usuário {string}', function (username) {
  // Assume registro prévio e faz login
  authSystem.registerUser(username, 'Senha123');
  authSystem.login(username, 'Senha123');
});

// Passo Quando: Faz login
When('eu faço login com usuário {string} e senha {string}', function (username, password) {
  // Tenta fazer login e armazena o resultado
  this.result = authSystem.login(username, password);
});

// Passo Quando: Faz logout
When('eu faço logout', function () {
  // Faz logout e armazena o resultado
  this.result = authSystem.logout();
});

// Passo Então: Deve estar logado
Then('eu devo estar logado', function () {
  // Verifica se há usuário logado
  if (!authSystem.loggedInUser) throw new Error('Não está logado');
});

// Passo Então: Não deve estar logado
Then('eu não devo estar logado', function () {
  // Verifica se não há usuário logado
  if (authSystem.loggedInUser) throw new Error('Está logado inesperadamente');
});

// Passo Então: Deve estar deslogado
Then('eu devo estar deslogado', function () {
  // Verifica se o logout foi bem-sucedido
  if (authSystem.loggedInUser) throw new Error('Ainda está logado');
});