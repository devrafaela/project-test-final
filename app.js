// Lógica Interativa da Interface Web
// Conecta a interface HTML aos módulos TDD e BDD
// Trata eventos de formulários e exibe resultados com feedback visual

// Importa funções do módulo TDD (validações)
import { validateEmail, validateStrongPassword } from '../src/tdd/validation.js';
import { formatDate } from '../src/tdd/dateFormatter.js';
// Importa classe do módulo BDD (autenticação)
import { AuthSystem } from '../src/bdd/auth.js';

// Instancia o sistema de autenticação (compartilhado na interface)
const authSystem = new AuthSystem();

// Função auxiliar para mostrar alertas com animação
// Recebe o elemento do alerta e a mensagem a exibir
function showAlert(element, message) {
  element.innerHTML = message;  // Define o conteúdo do alerta
  element.style.display = 'block';  // Torna visível
  element.classList.add('show');  // Adiciona classe para animação
  // Oculta automaticamente após 3 segundos
  setTimeout(() => {
    element.classList.remove('show');  // Remove animação
    setTimeout(() => element.style.display = 'none', 300);  // Oculta após transição
  }, 3000);
}

// Seção TDD: Validação de Dados
// Trata o envio do formulário de validação
document.getElementById('validationForm').addEventListener('submit', (e) => {
  e.preventDefault();  // Previne recarregamento da página
  // Obtém valores dos campos
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const date = document.getElementById('date').value;
  // Valida os dados usando funções TDD
  const emailValid = validateEmail(email);
  const passwordValid = validateStrongPassword(password);
  const dateFormatted = formatDate(date);
  // Monta mensagem de resultado em português
  const resultMessage = `
    <strong>Email válido:</strong> ${emailValid ? 'Sim' : 'Não'}<br>
    <strong>Senha forte:</strong> ${passwordValid ? 'Sim' : 'Não'}<br>
    <strong>Data formatada:</strong> ${dateFormatted || 'Inválida'}
  `;
  // Exibe o resultado no alerta
  showAlert(document.getElementById('validationResult'), resultMessage);
});

// Seção BDD: Autenticação
// Trata o clique no botão de registrar
document.getElementById('registerBtn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('authPassword').value;
  // Tenta registrar o usuário
  const success = authSystem.registerUser(username, password);
  const message = success ? 'Registrado com sucesso!' : 'Usuário já existe.';
  showAlert(document.getElementById('authResult'), message);
});

// Trata o clique no botão de login
document.getElementById('loginBtn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('authPassword').value;
  // Tenta fazer login
  const success = authSystem.login(username, password);
  const message = success ? 'Logado com sucesso!' : 'Falha no login.';
  showAlert(document.getElementById('authResult'), message);
});

// Trata o clique no botão de logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  // Faz logout
  authSystem.logout();
  showAlert(document.getElementById('authResult'), 'Deslogado com sucesso.');
});

// Seção BDD: Carrinho
// Trata o clique no botão de adicionar ao carrinho
document.getElementById('addToCartBtn').addEventListener('click', () => {
  const item = document.getElementById('item').value;
  // Tenta adicionar o item
  const success = authSystem.addToCart(item);
  const message = success ? `Item "${item}" adicionado ao carrinho!` : 'Erro: Faça login primeiro.';
  showAlert(document.getElementById('cartResult'), message);
});