// Módulo TDD: Validações Rigorosas para Cadastro de Usuário
// Este arquivo contém funções de validação desenvolvidas com TDD
// Cada função foi criada seguindo o ciclo RED-GREEN-REFACTOR: teste falha (RED), código para passar (GREEN), refatoração (REFACTOR)
// Agora com validações mais rigorosas: email deve ter formato exato, senha com símbolo especial

// Função para validar um endereço de email
// Verifica se o email segue o formato exato: usuario@dominio.com (ou .br, etc.)
// Desenvolvida com TDD: testes garantiram que rejeite emails sem @ ou domínio
export function validateEmail(email) {
  // Expressão regular estrita: deve ter caracteres antes de @, domínio e extensão válida (ex: .com, .br)
  // Não aceita palavras simples sem @ ou domínio
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Retorna true se corresponder exatamente ao formato, false caso contrário
  return emailRegex.test(email);
}

// Função para validar se uma senha é forte
// Requisitos rigorosos: mínimo 8 caracteres, pelo menos 1 número e 1 símbolo especial (ex: !@#$%)
// Criada com TDD para garantir segurança máxima no cadastro
export function validateStrongPassword(password) {
  // Regex que impõe os critérios: lookahead para verificar presença de número e símbolo
  // Deve ter pelo menos 8 caracteres, 1 dígito e 1 símbolo especial
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\$\${};':"\\|,.<>\/?]).{8,}$/;
  // Retorna true se atender a todos os requisitos estritos
  return passwordRegex.test(password);
}