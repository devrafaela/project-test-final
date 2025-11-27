// Step Definitions para Cenários de Carrinho
// Implementa os passos para adicionar itens ao carrinho
// Conecta os cenários Gherkin à lógica do sistema de autenticação

// Importa hooks do Cucumber para definir passos
import { Given, When, Then } from '@cucumber/cucumber';
// Importa a classe do sistema de autenticação
import { AuthSystem } from '../auth.js';

// Instancia o sistema de autenticação (compartilhado entre cenários)
let authSystem = new AuthSystem();

// Passo Dado: Usuário logado
Given('que eu estou logado com usuário {string}', function (username) {
  // Registra o usuário com uma senha padrão para o teste
  authSystem.registerUser(username, 'Senha123');
  // Faz login com as credenciais
  authSystem.login(username, 'Senha123');
});

// Passo Quando: Adiciona item ao carrinho
When('eu adiciono {string} ao carrinho', function (item) {
  // Chama o método de adicionar ao carrinho e armazena o resultado
  this.result = authSystem.addToCart(item);
});

// Passo Então: Verifica se o item está no carrinho
Then('o carrinho deve conter {string}', function (item) {
  // Verifica se o item está presente no array do carrinho
  if (!authSystem.cart.includes(item)) throw new Error('Item não está no carrinho');
});