import { validateEmail, validateStrongPassword } from './src/tdd/validation.js';
import { formatDate } from './src/tdd/dateFormatter.js';
import { AuthSystem } from './src/bdd/auth.js';

const authSystem = new AuthSystem();

// TDD: Validação
document.getElementById('validationForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const date = document.getElementById('date').value;
  const result = document.getElementById('validationResult');
  result.innerHTML = `
    <strong>Email válido:</strong> ${validateEmail(email) ? 'Sim' : 'Não'}<br>
    <strong>Senha forte:</strong> ${validateStrongPassword(password) ? 'Sim' : 'Não'}<br>
    <strong>Data formatada:</strong> ${formatDate(date) || 'Inválida'}
  `;
  result.classList.add('show');
});

// BDD: Autenticação e Carrinho
document.getElementById('registerBtn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('authPassword').value;
  const success = authSystem.registerUser(username, password);
  const result = document.getElementById('authResult');
  result.innerHTML = success ? 'Registrado com sucesso!' : 'Usuário já existe.';
  result.classList.add('show');
});

document.getElementById('loginBtn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('authPassword').value;
  const success = authSystem.login(username, password);
  const result = document.getElementById('authResult');
  result.innerHTML = success ? 'Logado!' : 'Falha no login.';
  result.classList.add('show');
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  authSystem.logout();
  const result = document.getElementById('authResult');
  result.innerHTML = 'Deslogado.';
  result.classList.add('show');
});

document.getElementById('addToCartBtn').addEventListener('click', () => {
  const item = document.getElementById('item').value;
  const success = authSystem.addToCart(item);
  const result = document.getElementById('cartResult');
  result.innerHTML = success ? `Item "${item}" adicionado ao carrinho!` : 'Erro: Faça login primeiro.';
  result.classList.add('show');
});