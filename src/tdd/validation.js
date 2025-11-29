// Módulo TDD: Validações Rigorosas para Cadastro de Usuário
// Este arquivo contém funções de validação desenvolvidas com TDD
// Requisitos: email no formato usuário@domínio.ext e senha com mínimo 8 caracteres,
// ao menos 1 número e ao menos 1 símbolo especial

// =======================
// VALIDAÇÃO DE EMAIL
// =======================
export function validateEmail(email) {
  // Regex estrita: antes do @, domínio e extensão (mínimo 2 letras)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// =======================
// VALIDAÇÃO DE SENHA FORTE
// =======================
export function validateStrongPassword(password) {
  if (typeof password !== 'string') return false;

  // -----------------------
  // RED: teste inicial falhando
  // const passwordRegex = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  // -----------------------
  // GREEN: implementação mínima para passar o teste
  // const passwordRegex = /^(?!.*\s)(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  // -----------------------
  // REFACTOR: regex extraída para constante, função enxuta
  const PASSWORD_REGEX = /^(?!.*\s)(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return PASSWORD_REGEX.test(password);
}
