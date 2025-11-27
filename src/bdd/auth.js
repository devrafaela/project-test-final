// Módulo BDD: Sistema de Autenticação com Email e Itens de Mercado
// Classe que gerencia usuários, login/logout e adição de itens
// Desenvolvido para suportar cenários BDD: foco no comportamento do usuário
// Agora carrega usuários do "banco" (localStorage) salvo pelo TDD

// Classe principal do sistema de autenticação
export class AuthSystem {
  // Construtor: inicializa o sistema carregando dados do "banco" localStorage
  constructor() {
    // Carrega usuários salvos pelo TDD (persistência local como banco)
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    // Usuário atualmente logado (null se ninguém estiver logado)
    this.loggedInUser = null;
    // Lista de itens de mercado adicionados após login
    this.marketItems = JSON.parse(localStorage.getItem('marketItems')) || [];
  }

  // Método para registrar usuário (compatibilidade com testes BDD)
  // Adiciona usuário à lista se não existir
  registerUser(username, password) {
    // Verifica se o usuário já existe
    if (this.users.find(u => u.username === username)) return false;
    // Adiciona novo usuário
    this.users.push({ username, password });
    // Salva no localStorage (banco simulado)
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  // Método para login (BDD: comportamento de autenticação com email)
  // Verifica se email e senha correspondem a um usuário cadastrado no "banco"
  login(email, password) {
    // Busca o usuário com email e senha fornecidos no banco
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      // Define o usuário como logado
      this.loggedInUser = user;
      return true;  // Login bem-sucedido
    }
    return false;  // Falha no login
  }

  // Método para logout (BDD: comportamento de desconexão)
  // Remove o usuário logado e limpa itens
  logout() {
    // Reseta o usuário logado
    this.loggedInUser = null;
    // Limpa a lista de itens de mercado
    this.marketItems = [];
    // Salva no localStorage
    localStorage.setItem('marketItems', JSON.stringify(this.marketItems));
    return true;  // Logout sempre bem-sucedido
  }

  // Método para adicionar item de mercado (BDD: comportamento após login)
  // Só permite se o usuário estiver logado
  addMarketItem(itemName, price) {
    // Verifica se há usuário logado
    if (!this.loggedInUser) return false;  // Impede adição sem login
    // Adiciona o item à lista com nome e preço
    this.marketItems.push({ name: itemName, price });
    // Salva no localStorage para persistência
    localStorage.setItem('marketItems', JSON.stringify(this.marketItems));
    return true;  // Adição bem-sucedida
  }

  // Método para calcular o total dos itens de mercado
  // Soma os preços de todos os itens adicionados
  getMarketTotal() {
    // Usa reduce para somar os preços
    return this.marketItems.reduce((total, item) => total + item.price, 0);
  }

  // Método para adicionar ao carrinho (compatibilidade com cenários antigos)
  // Simula carrinho como lista de itens
  addToCart(item) {
    // Verifica se há usuário logado
    if (!this.loggedInUser) return false;
    // Adiciona item ao carrinho (simplificado)
    this.marketItems.push(item);
    localStorage.setItem('marketItems', JSON.stringify(this.marketItems));
    return true;
  }

  // Propriedade para carrinho (compatibilidade)
  get cart() {
    return this.marketItems;
  }
}