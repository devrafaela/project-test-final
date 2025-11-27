// Step Definitions para Cenários de Login
// Implementa os passos dos cenários Gherkin em código JS
// Conecta cenários BDD à lógica de autenticação com email

// Importa hooks do Cucumber para definir passos
import { Given, When, Then } from '@cucumber/cucumber';
// Importa a classe do sistema de autenticação
import { AuthSystem } from '../auth.js';

// Instancia o sistema para os testes
let authSystem = new AuthSystem();

// Passo Dado: Usuário com email cadastrado
Given('que eu tenho um email {string} cadastrado', function (email) {
  // Simula cadastro adicionando usuário à lista (compatível com TDD)
  authSystem.users.push({ email, password: 'Senha123' });
});

// Passo Dado: Sem email cadastrado
Given('que eu não tenho email cadastrado', function () {
  // Sistema permanece vazio (não faz nada, para testar falha)
});

// Passo Dado: Usuário logado
Given('que eu estou logado com email {string}', function (email) {
  // Simula cadastro e login automático
  authSystem.users.push({ email, password: 'Senha123' });
  authSystem.login(email, 'Senha123');
});

// Passo Quando: Faz login
When('eu faço login com email {string} e senha {string}', function (email, password) {
  // Tenta login e armazena resultado para verificação
  this.result = authSystem.login(email, password);
});

// Passo Quando: Faz logout
When('eu faço logout', function () {
  // Faz logout e armazena resultado
  this.result = authSystem.logout();
});

// Passo Então: Deve estar logado
Then('eu devo estar logado', function () {
  // Verifica se há usuário logado, lança erro se não
  if (!authSystem.loggedInUser) throw new Error('Não está logado');
});

// Passo Então: Não deve estar logado
Then('eu não devo estar logado', function () {
  // Verifica se não há usuário logado, lança erro se estiver
  if (authSystem.loggedInUser) throw new Error('Está logado inesperadamente');
});

// Passo Então: Deve estar deslogado
Then('eu devo estar deslogado', function () {
  // Verifica se logout foi bem-sucedido
  if (authSystem.loggedInUser) throw new Error('Ainda está logado');
});