// Arquivo de Testes TDD para o Módulo de Validação
// Usa Jest para executar testes unitários rigorosos
// Segue o ciclo RED-GREEN-REFACTOR: escreve teste (RED), implementa código (GREEN), refatora (REFACTOR)

// Importa as funções a serem testadas do módulo de validação
import { validateEmail, validateStrongPassword } from './validation.js';
// Importa a função de formatação de data
import { formatDate } from './dateFormatter.js';

// Grupo de testes para o módulo de validação
describe('Módulo de Validação (TDD)', () => {
  // Testes rigorosos para validateEmail
  test('deve validar um email correto e estrito', () => {
    // Espera que um email válido retorne true
    expect(validateEmail('teste@example.com')).toBe(true);
  });

  test('deve invalidar um email incorreto ou incompleto', () => {
    // Espera que emails sem @, domínio ou extensão retornem false
    expect(validateEmail('emailinvalido')).toBe(false);
    expect(validateEmail('teste@')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
  });

  // Testes rigorosos para validateStrongPassword
  test('deve validar uma senha forte e completa', () => {
    // Senha com 8+ caracteres, maiúscula, minúscula e número
    expect(validateStrongPassword('SenhaForte123')).toBe(true);
  });

  test('deve invalidar uma senha fraca ou incompleta', () => {
    // Senhas sem atender aos critérios rigorosos
    expect(validateStrongPassword('fraca')).toBe(false);  // Curta e sem maiúscula/número
    expect(validateStrongPassword('senhafraca')).toBe(false);  // Sem maiúscula/número
    expect(validateStrongPassword('SENHAFRACA')).toBe(false);  // Sem minúscula/número
    expect(validateStrongPassword('SenhaFraca')).toBe(false);  // Sem número
  });

  // Testes para formatDate
  test('deve formatar uma data válida', () => {
    // Converte para formato brasileiro
    expect(formatDate('2023-10-05')).toBe('05/10/2023');
  });

  test('deve retornar null para uma data inválida', () => {
    // Para entrada não reconhecida como data, retorna null
    expect(formatDate('datainvalida')).toBe(null);
  });
});