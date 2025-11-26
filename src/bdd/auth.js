// Módulo BDD: Sistema de Autenticação e Carrinho
// Classe que simula um sistema de usuários e carrinho de compras
// Implementado para suportar cenários BDD em Gherkin (foco no comportamento do usuário)

// Classe principal do sistema de autenticação
export class AuthSystem {
  // Construtor: inicializa o sistema com arrays vazios
  constructor() {
    this.users = [];  // Array para armazenar usuários registrados (simulação de banco)
    this.loggedInUser = null;  // Usuário atualmente logado (null se ninguém estiver logado)
    this.cart = [];  // Array para itens do carrinho
  }

  // Método para registrar um novo usuário
  // Retorna true se registrado com sucesso, false se o usuário já existir
  registerUser(username, password) {
    // Verifica se o usuário já existe
    if (this.users.find(u => u.username === username)) return false;
    // Adiciona o novo usuário ao array
    this.users.push({ username, password });
    return true;
  }

  // Método para fazer login
  // Retorna true se credenciais corretas, false caso contrário
  login(username, password) {
    // Busca o usuário com as credenciais fornecidas
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      // Define o usuário logado
      this.loggedInUser = user;
      return true;
    }
    return false;
  }

  // Método para fazer logout
  // Sempre retorna true (logout bem-sucedido)
  logout() {
    // Remove o usuário logado
    this.loggedInUser = null;
    return true;
  }

  // Método para adicionar item ao carrinho
  // Só permite se o usuário estiver logado
  addToCart(item) {
    // Verifica se há usuário logado
    if (!this.loggedInUser) return false;
    // Adiciona o item ao carrinho
    this.cart.push(item);
    return true;
  }
}