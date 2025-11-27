// Lógica Interativa da Interface Web
// Conecta a interface HTML aos módulos TDD e BDD
// Trata eventos de formulários, validações dinâmicas em tempo real, persistência e interações
// Foco no TDD: validações rigorosas, máscara de data, checkbox para senha

// Importa funções do módulo TDD (validações rigorosas para cadastro)
import { validateEmail, validateStrongPassword } from './src/tdd/validation.js';
import { formatDate } from './src/tdd/dateFormatter.js';
// Importa classe do módulo BDD (autenticação)
import { AuthSystem } from './src/bdd/auth.js';

// Instâncias globais
// Cria instância do sistema de autenticação, que carrega dados do localStorage (banco simulado)
const authSystem = new AuthSystem();

// Função para mostrar notificações rápidas (toast-like)
// Recebe mensagem e tipo (success, danger) para feedback visual
function showNotification(message, type = 'success') {
  // Cria um elemento de notificação temporária
  const notification = document.createElement('div');
  notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
  notification.style.zIndex = '1050';
  notification.innerHTML = `<i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i> ${message}`;
  document.body.appendChild(notification);
  // Remove automaticamente após 3 segundos
  setTimeout(() => document.body.removeChild(notification), 3000);
}

// Função para aplicar máscara de data em DD/MM/AAAA
// Formata automaticamente enquanto o usuário digita, obrigando preenchimento completo
function applyDateMask(event) {
  // Obtém o valor atual do campo, removendo tudo que não é dígito
  let value = event.target.value.replace(/\D/g, '');
  // Aplica a máscara: DD/MM/AAAA
  if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
  if (value.length >= 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
  // Limita a 10 caracteres (DD/MM/AAAA), obrigando preenchimento completo
  event.target.value = value.slice(0, 10);
}

// Função para atualizar validações em tempo real (TDD)
// Chamada enquanto o usuário digita nos campos de cadastro
function updateValidations() {
  // Obtém valores atuais dos campos de cadastro
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const date = document.getElementById('regDate').value;

  // Valida email em tempo real (formato exato: usuario@dominio.com)
  const emailValid = validateEmail(email);
  const emailFeedback = document.getElementById('emailFeedback');
  emailFeedback.textContent = email ? (emailValid ? 'Email válido' : 'Email inválido') : '';
  emailFeedback.className = emailValid ? 'feedback text-success' : 'feedback text-danger';

  // Valida senha em tempo real (>=8 chars, 1 número, 1 símbolo especial)
  const passwordValid = validateStrongPassword(password);
  const passwordFeedback = document.getElementById('passwordFeedback');
  passwordFeedback.textContent = password ? (passwordValid ? 'Senha forte' : 'Precisa de 8+ caracteres, 1 número e 1 símbolo especial') : '';
  passwordFeedback.className = passwordValid ? 'feedback text-success' : 'feedback text-danger';

  // Valida data em tempo real (máscara DD/MM/AAAA obrigatória completa)
  const dateValid = date.length === 10 && formatDate(date) !== null;  // Deve ter 10 chars e ser válida
  const dateFeedback = document.getElementById('dateFeedback');
  dateFeedback.textContent = date ? (dateValid ? 'Data válida' : 'Data inválida (preencha DD/MM/AAAA completa)') : '';
  dateFeedback.className = dateValid ? 'feedback text-success' : 'feedback text-danger';

  // Habilita/desabilita botão de cadastro com base na validade geral (todos os campos)
  const registerBtn = document.getElementById('registerBtn');
  registerBtn.disabled = !(emailValid && passwordValid && dateValid);
}

// Adiciona eventos de input para validações dinâmicas (TDD)
// Enquanto digita, chama updateValidations para feedback imediato
document.getElementById('regEmail').addEventListener('input', updateValidations);
document.getElementById('regPassword').addEventListener('input', updateValidations);
// Adiciona máscara de data ao campo de data
document.getElementById('regDate').addEventListener('input', applyDateMask);
document.getElementById('regDate').addEventListener('input', updateValidations);  // Também valida após máscara

// Trata o clique no checkbox para mostrar/ocultar senha
// Altera o tipo do campo entre 'password' (pontinhos) e 'text' (visível)
document.getElementById('showPassword').addEventListener('change', (e) => {
  const passwordField = document.getElementById('regPassword');
  passwordField.type = e.target.checked ? 'text' : 'password';  // Mostra/oculta
});

// Trata o envio do formulário de cadastro (TDD)
// Só permite cadastro se todas as validações passarem (botão desabilitado se inválido)
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();  // Previne recarregamento da página
  // Obtém valores dos campos
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const date = document.getElementById('regDate').value;

  // Verifica se já existe usuário com esse email (do "banco" localStorage)
  const existingUser = authSystem.users.find(u => u.email === email);
  if (existingUser) {
    showNotification('Email já cadastrado!', 'danger');
    return;
  }

  // Se válido (botão habilitado), adiciona ao "banco" e salva
  authSystem.users.push({ email, password, date });
  localStorage.setItem('users', JSON.stringify(authSystem.users));
  showNotification('Cadastro realizado com sucesso!');
  // Limpa formulário
  document.getElementById('registerForm').reset();
  updateValidations();  // Reseta validações
});

// Trata o envio do formulário de login (BDD)
// Mantido para compatibilidade, mas foco no TDD
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();  // Previne recarregamento
  // Obtém valores dos campos
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Tenta login
  if (authSystem.login(email, password)) {
    showNotification('Login bem-sucedido!');
    // Mostra seção de itens de mercado
    document.getElementById('marketSection').style.display = 'block';
    updateItems();  // Atualiza lista de itens
  } else {
    showNotification('Email ou senha incorretos!', 'danger');
  }
});

// Trata o clique no botão de logout (BDD)
// Mantido para compatibilidade
document.getElementById('logoutBtn').addEventListener('click', () => {
  authSystem.logout();
  showNotification('Logout realizado!');
  document.getElementById('marketSection').style.display = 'none';
});

// Trata o clique no botão de adicionar item (BDD)
// Mantido para compatibilidade
document.getElementById('addItemBtn').addEventListener('click', () => {
  const select = document.getElementById('itemSelect');
  const [name, priceStr] = select.value.split(' - R$ ');
  const price = parseInt(priceStr);
  // Adiciona item (só se logado)
  if (authSystem.addMarketItem(name, price)) {
    showNotification(`${name} adicionado!`);
    updateItems();  // Atualiza lista e total
  } else {
    showNotification('Erro: Faça login primeiro!', 'danger');
  }
});

// Função para atualizar a lista de itens e total (BDD)
// Chamada após adicionar itens ou login
function updateItems() {
  const list = document.getElementById('itemList');
  list.innerHTML = '';  // Limpa lista anterior para evitar duplicatas
  // Adiciona cada item à lista visual, mostrando nome e preço
  authSystem.marketItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';
    li.innerHTML = `<span>${item.name}</span><span>R$ ${item.price}</span>`;
    list.appendChild(li);
  });
  // Atualiza o total exibido, calculando a soma dos preços
  document.getElementById('total').textContent = `Total: R$ ${authSystem.getMarketTotal()}`;
}