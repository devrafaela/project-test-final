// =======================
// IMPORTA VALIDAÇÕES TDD
// =======================
import { validateEmail, validateStrongPassword } from "./src/tdd/validation.js";
import { formatDate } from "./src/tdd/dateFormatter.js";

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
// SUBMIT DO CADASTRO
// =======================
// Instancia o sistema de autenticação (pode ser no topo do arquivo, fora do submit)
const authSystem = new AuthSystem();

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Pega os valores do formulário
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const date = dateInput.value;

  // ===== NOVA PARTE: envia para backend Express =====
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, date })
    });

    const result = await response.json();

    if (result.success) {
      alert("Cadastro realizado com sucesso!");
      
      // Aqui você pode limpar os campos, feedbacks e estados
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
      // Exibe erro de forma amigável
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
  } catch (error) {
    console.error("Erro ao enviar dados ao servidor:", error);
    alert("Falha ao conectar com o servidor.");
  }
  // ==================================================

});
