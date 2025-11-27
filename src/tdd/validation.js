// Módulo TDD: Validações para Cadastro de Usuário
// Este arquivo contém funções de validação desenvolvidas com TDD
// Cada função foi criada seguindo o ciclo RED-GREEN-REFACTOR: teste falha (RED), código para passar (GREEN), refatoração (REFACTOR)

// Função para validar um endereço de email
// Verifica se o email segue o formato padrão (ex: usuario@dominio.com)
// Desenvolvida com TDD: testes primeiro garantiram que regex funcione corretamente
export function validateEmail(email) {
  // Expressão regular para validar email: deve ter caracteres antes de @, domínio e extensão
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Retorna true se o email corresponder ao padrão, false caso contrário
  return emailRegex.test(email);
}

// Função para validar se uma senha é forte
// Requisitos: mínimo 8 caracteres, 1 letra minúscula, 1 maiúscula e 1 número
// Criada com TDD para garantir segurança no cadastro
export function validateStrongPassword(password) {
  // Regex que impõe os critérios de força: lookahead para verificar presença de tipos de caracteres
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  // Retorna true se a senha atender a todos os requisitos
  return passwordRegex.test(password);
}