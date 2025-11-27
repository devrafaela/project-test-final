// =======================
// IMPORTA VALIDAÇÕES TDD
// =======================
import { validateEmail, validateStrongPassword } from "./src/tdd/validation.js";
import { formatDate } from "./src/tdd/dateFormatter.js";
import { AuthSystem } from "./src/bdd/auth.js"; // versão localStorage navegador

// =======================
// CAMPOS DO FORMULÁRIO
// =======================
const emailInput = document.getElementById("regEmail");
const passwordInput = document.getElementById("regPassword");
const dateInput = document.getElementById("regDate");

const emailFeedback = document.getElementById("emailFeedback");
const passwordFeedback = document.getElementById("passwordFeedback");
const dateFeedback = document.getElementById("dateFeedback");

const registerBtn = document.getElementById("registerBtn");

// =======================
// ESTADOS DE VALIDAÇÃO
// =======================
let emailValid = false;
let passwordValid = false;
let dateValid = false;

// =======================
// ATUALIZA BOTÃO
// =======================
function updateButton() {
  registerBtn.disabled = !(emailValid && passwordValid && dateValid);
}

// =======================
// EMAIL DINÂMICO
// =======================
emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();

  if (validateEmail(email)) {
    emailFeedback.textContent = "✔ Email válido";
    emailFeedback.classList.replace("text-danger", "text-success");
    emailValid = true;
  } else {
    emailFeedback.textContent = "❌ Formato inválido (ex: usuario@email.com)";
    emailFeedback.classList.replace("text-success", "text-danger");
    emailValid = false;
  }

  updateButton();
});

// =======================
// SENHA DINÂMICA
// =======================
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  if (validateStrongPassword(password)) {
    passwordFeedback.textContent = "✔ Senha forte";
    passwordFeedback.classList.replace("text-danger", "text-success");
    passwordValid = true;
  } else {
    passwordFeedback.textContent =
      "❌ Mín. 8 caracteres, 1 número e 1 símbolo";
    passwordFeedback.classList.replace("text-success", "text-danger");
    passwordValid = false;
  }

  updateButton();
});

// =======================
// MOSTRAR / OCULTAR SENHA
// =======================
const showPasswordCheckbox = document.getElementById("showPassword");
if (showPasswordCheckbox) {
  showPasswordCheckbox.addEventListener("change", (e) => {
    passwordInput.type = e.target.checked ? "text" : "password";
  });
}

// =======================
// MÁSCARA DE DATA + VALIDAÇÃO
// =======================
dateInput.addEventListener("input", () => {
  let value = dateInput.value.replace(/\D/g, "");

  if (value.length > 8) value = value.slice(0, 8);

  // Aplica máscara DD/MM/AAAA
  if (value.length > 4) {
    value = value.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d+)/, "$1/$2");
  }

  dateInput.value = value;

  // Validação real
  if (value.length === 10) {
    const formatted = formatDate(value);

    if (formatted !== null) {
      dateFeedback.textContent = "✔ Data válida";
      dateFeedback.classList.replace("text-danger", "text-success");
      dateValid = true;
    } else {
      dateFeedback.textContent = "❌ Data inválida";
      dateFeedback.classList.replace("text-success", "text-danger");
      dateValid = false;
    }
  } else {
    dateFeedback.textContent = "Digite no formato DD/MM/AAAA";
    dateFeedback.classList.replace("text-success", "text-danger");
    dateValid = false;
  }

  updateButton();
});

// =======================
// INSTANCIA SISTEMA DE AUTENTICAÇÃO
// =======================
const authSystem = new AuthSystem();

// =======================
// SUBMIT DO CADASTRO
// =======================
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const date = dateInput.value;

  // ===== Registro no localStorage =====
  const result = await authSystem.registerUser(email, password, date);

  if (result.success) {
    alert("Cadastro realizado com sucesso!");

    // Limpa campos e feedbacks
    emailInput.value = "";
    passwordInput.value = "";
    dateInput.value = "";
    emailFeedback.textContent = "";
    passwordFeedback.textContent = "";
    dateFeedback.textContent = "";
    emailValid = false;
    passwordValid = false;
    dateValid = false;
    updateButton();
  } else {
    // Feedback de erro amigável
    switch (result.error) {
      case "invalid_email":
        alert("O email informado é inválido!");
        break;
      case "weak_password":
        alert("A senha é fraca! Mínimo 8 caracteres, 1 número e 1 símbolo.");
        break;
      case "exists":
        alert("Esse email já está cadastrado!");
        break;
      default:
        alert("Erro desconhecido ao cadastrar!");
    }
  }
});

// =======================
// LOGIN
// =======================
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const logoutBtn = document.getElementById("logoutBtn");
const marketSection = document.getElementById("marketSection");
const itemSelect = document.getElementById("itemSelect");

// =======================
// ITENS DINÂMICOS ALEATÓRIOS
// =======================
const availableItems = [
  "Arroz", "Feijão", "Leite", "Pão", "Queijo", "Manteiga", 
  "Macarrão", "Tomate", "Alface", "Cenoura", "Frango", "Carne", 
  "Ovo", "Açúcar", "Café", "Chocolate"
];

// Função para gerar preço aleatório entre 1 e 20
function getRandomPrice() {
  return Math.floor(Math.random() * 20) + 1;
}

// Popula o select com itens e preços aleatórios
availableItems.forEach(item => {
  const option = document.createElement("option");
  option.value = `${item} - R$ ${getRandomPrice()}`;
  option.textContent = option.value;
  itemSelect.appendChild(option);
});



const addItemBtn = document.getElementById("addItemBtn");
const itemList = document.getElementById("itemList");
const totalEl = document.getElementById("total");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  const result = await authSystem.login(email, password);

  if (result.success) {
    alert("Login efetuado com sucesso!");

    // mostra seção de mercado
    marketSection.style.display = "block";

    // limpa campos de login
    loginEmail.value = "";
    loginPassword.value = "";

    // atualiza lista de itens
    updateMarket();
  } else {
    switch (result.error) {
      case "not_found":
        alert("Usuário não encontrado!");
        break;
      case "wrong_password":
        alert("Senha incorreta!");
        break;
      case "invalid_email":
        alert("Email inválido!");
        break;
      default:
        alert("Erro desconhecido ao logar!");
    }
  }
});

// =======================
// LOGOUT
// =======================
logoutBtn.addEventListener("click", () => {
  authSystem.logout();
  marketSection.style.display = "none";
  itemList.innerHTML = "";
  totalEl.textContent = "Total: R$ 0";
  alert("Logout realizado!");
});

// =======================
// ADICIONAR ITENS
// =======================
addItemBtn.addEventListener("click", () => {
  const selected = itemSelect.value.split(" - R$ ");
  const name = selected[0];
  const price = Number(selected[1]);

  authSystem.addMarketItem(name, price);
  updateMarket();
});

// =======================
// ATUALIZA LISTA DE ITENS
// =======================
function updateMarket() {
  itemList.innerHTML = "";
  authSystem.marketItems.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = item.name;
    const span = document.createElement("span");
    span.textContent = `R$ ${item.price}`;
    li.appendChild(span);
    itemList.appendChild(li);
  });

  totalEl.textContent = `Total: R$ ${authSystem.getMarketTotal()}`;
}
