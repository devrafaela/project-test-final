// Módulo TDD: Validação de Dados
// Este arquivo contém funções para validar email e senha forte
// Implementado seguindo o ciclo TDD: testes primeiro, depois código

// Função para validar um endereço de email
// Usa uma expressão regular para verificar o formato padrão de email
export function validateEmail(email) {
  // Regex que verifica se há caracteres antes de @, domínio e extensão
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Retorna true se o email corresponder ao padrão
  return emailRegex.test(email);
}

// Função para validar se uma senha é forte
// Requisitos: pelo menos 8 caracteres, 1 maiúscula, 1 minúscula e 1 número
export function validateStrongPassword(password) {
  // Regex que impõe os critérios de força da senha
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  // Retorna true se a senha atender aos requisitos
  return passwordRegex.test(password);
}