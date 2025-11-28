// ============================================================
// Módulo de Autenticação (AuthSystem)
// Compatível com Node.js (BDD/TDD) e navegador
// ============================================================

// ============================
// Mock localStorage para Node.js
// ============================
if (typeof localStorage === 'undefined' || localStorage === null) {
  global.localStorage = {
    _storage: {},
    setItem(key, value) {
      this._storage[key] = value;
    },
    getItem(key) {
      return this._storage[key] || null;
    },
    removeItem(key) {
      delete this._storage[key];
    },
    clear() {
      this._storage = {};
    }
  };
}

// ============================
// Importa validações TDD
// ============================
import { validateEmail, validateStrongPassword } from '../tdd/validation.js';

// ============================================================
// Classe AuthSystem
// ============================================================
export class AuthSystem {
  constructor() {
    // Lista de usuários
    this.users = this.loadUsers();
    // Usuário logado
    this.loggedInUser = null;

    // Itens do mercado (carrinho/market)
    this.marketItems = JSON.parse(localStorage.getItem("marketItems")) || [];
  }

  // ============================
  // Persistência localStorage
  // ============================
  loadUsers() {
    try {
      return JSON.parse(localStorage.getItem("users")) || [];
    } catch (err) {
      console.error("Erro ao carregar users:", err);
      return [];
    }
  }

  saveUsers() {
    try {
      localStorage.setItem("users", JSON.stringify(this.users));
    } catch (err) {
      console.error("Erro ao salvar users:", err);
    }
  }

  // ============================
  // Hash de senha (Web Crypto)
  // ============================
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // ============================
  // Registro
  // ============================
  async registerUser(email, password, date = null) {
    if (!validateEmail(email)) return { success: false, error: "invalid_email" };
    if (!validateStrongPassword(password)) return { success: false, error: "weak_password" };

    this.users = this.loadUsers();

    if (this.users.find(u => u.email === email)) {
      return { success: false, error: "exists" };
    }

    const hashed = await this.hashPassword(password);

    const newUser = {
      email,
      password: hashed,
      passwordLength: password.length,
      date
    };

    this.users.push(newUser);
    this.saveUsers();

    return { success: true, error: null };
  }

  // ============================
  // Login
  // ============================
  async login(email, password) {
    if (!validateEmail(email)) return { success: false, error: "invalid_email" };

    this.users = this.loadUsers();

    const user = this.users.find(u => u.email === email);
    if (!user) return { success: false, error: "not_found" };

    const hashed = await this.hashPassword(password);

    if (hashed !== user.password)
      return { success: false, error: "wrong_password" };

    this.loggedInUser = {
      email: user.email,
      date: user.date,
      passwordLength: user.passwordLength
    };

    this.marketItems =
      JSON.parse(localStorage.getItem("marketItems")) || [];

    return { success: true, error: null };
  }

  // ============================
  // Logout
  // ============================
  logout() {
    this.loggedInUser = null;
    this.marketItems = [];
    localStorage.setItem("marketItems", JSON.stringify([]));

    return { success: true };
  }

  // ============================
  // Adicionar item ao mercado
  // ============================
  addMarketItem(name, price) {
    if (!this.loggedInUser) return { success: false, error: "not_logged_in" };

    this.marketItems.push({ name, price: Number(price) });

    localStorage.setItem("marketItems", JSON.stringify(this.marketItems));

    return { success: true };
  }

  // ============================
  // Calcula total dos itens
  // ============================
  getMarketTotal() {
    return this.marketItems.reduce((t, i) => t + i.price, 0);
  }
}
