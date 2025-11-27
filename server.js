import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import crypto from "crypto";
import { validateEmail, validateStrongPassword } from "./src/tdd/validation.js";

// Necessário para usar __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do arquivo JSON
const USERS_PATH = path.join(__dirname, "data", "users.json");

// App Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ===============================
// ADICIONADO → Servir arquivos estáticos
// ===============================
app.use(express.static(path.join(__dirname, "public")));
// Agora http://localhost:3000/ abre public/index.html automaticamente

// Utilitário: Carrega usuários
function loadUsers() {
  try {
    const data = fs.readFileSync(USERS_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Utilitário: Salva usuários
function saveUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

// Hash da senha
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// ==========================
// Rota: Registrar usuário
// ==========================
app.post("/register", (req, res) => {
  const { email, password, date } = req.body;

  if (!validateEmail(email)) return res.json({ success: false, error: "invalid_email" });
  if (!validateStrongPassword(password)) return res.json({ success: false, error: "weak_password" });

  const users = loadUsers();

  if (users.find(u => u.email === email)) {
    return res.json({ success: false, error: "exists" });
  }

  const user = {
    email,
    password: hashPassword(password),
    passwordLength: password.length,
    date
  };

  users.push(user);
  saveUsers(users);

  return res.json({ success: true });
});

// ==========================
// Rota: Login
// ==========================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.json({ success: false, error: "invalid_email" });
  }

  const users = loadUsers();
  const user = users.find(u => u.email === email);

  if (!user) return res.json({ success: false, error: "not_found" });

  if (user.password !== hashPassword(password)) {
    return res.json({ success: false, error: "wrong_password" });
  }

  return res.json({
    success: true,
    user: {
      email: user.email,
      date: user.date,
      passwordLength: user.passwordLength
    }
  });
});

// ==========================
// Iniciar servidor
// ==========================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
