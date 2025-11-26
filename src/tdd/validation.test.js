// Arquivo de Testes TDD para o Módulo de Validação
// Usa Jest para executar testes unitários
// Segue o ciclo RED-GREEN-REFACTOR: escreva teste (RED), implemente código (GREEN), refatore (REFACTOR)

import { validateEmail, validateStrongPassword } from './validation.js';  // Importa funções do módulo
import { formatDate } from './dateFormatter.js';  // Importa função adicional

// Grupo de testes para o módulo de validação
describe('Módulo de Validação (TDD)', () => {
  // Testes para validateEmail
  test('deve validar um email correto', () => {
    // Espera que um email válido retorne true
    expect(validateEmail('teste@exemplo.com')).toBe(true);
  });

  test('deve invalidar um email incorreto', () => {
    // Espera que um email inválido retorne false
    expect(validateEmail('email-invalido')).toBe(false);
  });

  // Testes para validateStrongPassword
  test('deve validar uma senha forte', () => {
    // Senha com 8+ caracteres, maiúscula, minúscula e número
    expect(validateStrongPassword('SenhaForte123')).toBe(true);
  });

  test('deve invalidar uma senha fraca', () => {
    // Senha sem atender aos critérios
    expect(validateStrongPassword('fraca')).toBe(false);
  });

  // Testes para formatDate
  test('deve formatar uma data válida', () => {
    // Converte para formato brasileiro
    expect(formatDate('2023-10-05')).toBe('05/10/2023');
  });

  test('deve retornar null para uma data inválida', () => {
    // Para entrada inválida, retorna null
    expect(formatDate('invalida')).toBe(null);
  });
});