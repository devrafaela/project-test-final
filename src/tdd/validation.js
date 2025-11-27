// src/tdd/validation.js
// Módulo TDD: Validações Rigorosas para Cadastro de Usuário
// Este arquivo contém funções de validação desenvolvidas com TDD
// Requisitos: email no formato usuário@domínio.ext e senha com mínimo 8 caracteres,
// ao menos 1 número e ao menos 1 símbolo especial

// Função para validar um endereço de email
export function validateEmail(email) {
  // Expressão regular estrita: caracteres antes do @, domínio e extensão (2+)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Função para validar se uma senha é forte
// Requisitos: mínimo 8 caracteres, pelo menos 1 dígito e pelo menos 1 símbolo (não alfanumérico)
export function validateStrongPassword(password) {
  if (typeof password !== 'string') return false;
  // Lookahead para garantir pelo menos um dígito e pelo menos um símbolo especial
  // Símbolos considerados: qualquer caractere que não seja letra ou número (ex: !@#$%^&*()-_=+[]{};:'",.<>/?\|)
  const passwordRegex = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return passwordRegex.test(password);
}
