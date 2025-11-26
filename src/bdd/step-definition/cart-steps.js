// Step Definitions para Cenários de Carrinho
// Implementa os passos para adicionar itens ao carrinho
// Conecta os cenários Gherkin à lógica do sistema de autenticação

import { Given, When, Then } from '@cucumber/cucumber';  // Importa hooks do Cucumber para definir passos
import { AuthSystem } from '../auth.js';  // Importa a classe do sistema de autenticação

// Instancia o sistema de autenticação (compartilhado entre cenários)
let authSystem = new AuthSystem();

// Passo Dado: Usuário logado
// Assume que o usuário já está registrado e faz login automaticamente
Given('que eu estou logado com usuário {string}', function (username) {
  // Registra o usuário com uma senha padrão para o teste
  authSystem.registerUser(username, 'Senha123');
  // Faz login com as credenciais
  authSystem.login(username, 'Senha123');
});

// Passo Quando: Adiciona item ao carrinho
// Tenta adicionar o item fornecido ao carrinho
When('eu adiciono {string} ao carrinho', function (item) {
  // Chama o método de adicionar ao carrinho e armazena o resultado
  this.result = authSystem.addToCart(item);
});

// Passo Então: Verifica se o item está no carrinho
// Confirma que o item foi adicionado com sucesso
Then('o carrinho deve conter {string}', function (item) {
  // Verifica se o item está presente no array do carrinho
  if (!authSystem.cart.includes(item)) throw new Error('Item não está no carrinho');
});