// Step Definitions para Cenários de Registro
// Implementa os passos para registro de usuário
// Compatível com BDD, embora registro principal seja no TDD

// Importa hooks do Cucumber
import { Given, When, Then } from '@cucumber/cucumber';
// Importa o sistema de autenticação
import { AuthSystem } from '../auth.js';

// Instancia o sistema
let authSystem = new AuthSystem();

// Passo Dado: Na página de registro
Given('que eu estou na página de registro', function () {
  // Simulação: apenas define o contexto (não há ação específica)
});

// Passo Quando: Faz registro
When('eu me registro com usuário {string} e senha {string}', function (username, password) {
  // Tenta registrar e armazena o resultado
  this.result = authSystem.registerUser(username, password);
});

// Passo Então: Conta criada
Then('minha conta deve ser criada', function () {
  // Verifica se o registro foi bem-sucedido
  if (!this.result) throw new Error('Conta não foi criada');
});
