// Arquivo de Testes TDD para o Módulo de Validação
// Usa Jest para executar testes unitários rigorosos
// Cobre cenários completos de email, senha e data

import { validateEmail, validateStrongPassword } from './validation.js';
import { formatDate } from './dateFormatter.js';

describe('Módulo de Validação (TDD)', () => {

  // ============================================================
  // EMAIL
  // ============================================================
  describe('validateEmail - Validação de Email', () => {
    
    test('deve validar emails corretos e bem formatados', () => {
      expect(validateEmail('teste@example.com')).toBe(true);
      expect(validateEmail('usuario.teste@dominio.com.br')).toBe(true);
      expect(validateEmail('nome_sobrenome123@site.net')).toBe(true);
      expect(validateEmail('user+tag@gmail.com')).toBe(true);
    });

    test('deve falhar para emails sem @', () => {
      expect(validateEmail('emailinvalido.com')).toBe(false);
      expect(validateEmail('usuario.dominio')).toBe(false);
    });

    test('deve falhar para emails sem domínio', () => {
      expect(validateEmail('teste@')).toBe(false);
      expect(validateEmail('usuario@.com')).toBe(false);
    });

    test('deve falhar para emails sem extensão válida', () => {
      expect(validateEmail('teste@dominio')).toBe(false);
      expect(validateEmail('teste@dominio.')).toBe(false);
      expect(validateEmail('teste@dominio.c')).toBe(false); // extensão mínima 2 letras
    });

    test('deve falhar para caracteres inválidos', () => {
      expect(validateEmail('us er@dominio.com')).toBe(false);
      expect(validateEmail('usuario@domínio.com')).toBe(false); // acento inválido
      expect(validateEmail('usuario@@dominio.com')).toBe(false);
    });

    test('deve falhar para email vazio ou não string', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
    });

  });

  // ============================================================
  // SENHA FORTE
  // ============================================================
  describe('validateStrongPassword - Validação de Senha Forte', () => {
    
    test('deve validar senhas fortes (8+ chars, 1 número, 1 símbolo)', () => {
      expect(validateStrongPassword('Senha123!')).toBe(true);
      expect(validateStrongPassword('Teste#2024')).toBe(true);
      expect(validateStrongPassword('@@123abc')).toBe(true);
      expect(validateStrongPassword('Abcdef1$')).toBe(true);
    });

    test('deve falhar para senhas sem número', () => {
      expect(validateStrongPassword('SenhaForte!')).toBe(false);
      expect(validateStrongPassword('Teste!Teste')).toBe(false);
    });

    test('deve falhar para senhas sem símbolo', () => {
      expect(validateStrongPassword('SenhaForte123')).toBe(false);
      expect(validateStrongPassword('Abcdef123')).toBe(false);
    });

    test('deve falhar para senhas com menos de 8 caracteres', () => {
      expect(validateStrongPassword('A1!a')).toBe(false);
      expect(validateStrongPassword('1234!ab')).toBe(false);
    });

    test('deve falhar para entradas não-string', () => {
      expect(validateStrongPassword(null)).toBe(false);
      expect(validateStrongPassword(undefined)).toBe(false);
      expect(validateStrongPassword(12345678)).toBe(false);
    });

  });

  // ============================================================
  // DATA (DD/MM/AAAA)
  // ============================================================
  describe('formatDate - Formatação de Data', () => {

    test('deve formatar corretamente datas completas DD/MM/AAAA', () => {
      expect(formatDate('05/10/2023')).toBe('05/10/2023');
      expect(formatDate('01/01/2000')).toBe('01/01/2000');
      expect(formatDate('31/12/1999')).toBe('31/12/1999');
    });

    test('deve converter datas AAAA-MM-DD corretamente', () => {
      expect(formatDate('2023-10-05')).toBe('05/10/2023');
      expect(formatDate('2000-01-01')).toBe('01/01/2000');
    });

    test('deve falhar para datas inválidas', () => {
      expect(formatDate('32/01/2023')).toBe(null);
      expect(formatDate('00/10/2023')).toBe(null);
      expect(formatDate('31/13/2023')).toBe(null);
      expect(formatDate('2023-20-10')).toBe(null);
      expect(formatDate('aaaa-bb-cc')).toBe(null);
    });

    test('deve falhar para formatos incompletos ou quebrados', () => {
      expect(formatDate('10/2023')).toBe(null);
      expect(formatDate('2023')).toBe(null);
      expect(formatDate('10/10')).toBe(null);
    });

    test('deve falhar para valores não-string', () => {
      expect(formatDate(null)).toBe(null);
      expect(formatDate(undefined)).toBe(null);
      expect(formatDate(12345)).toBe(null);
    });

  });




  // DEMO TDD (validation.js): REQUISITO NOVO — não aceitar espaços em senhas
  describe('TDD Demo - sem espaços na senha (RED)', () => {
    test('senha contendo espaço deve falhar', () => {
      expect(validateStrongPassword('Abc def1!')).toBe(false);
    });
  });





    // DEMO TDD: REQUISITO NOVO — aceitar espaços ao redor da string de data
  describe('TDD Demo - trim de datas (RED)', () => {
    test('deve aceitar datas com espaços ao redor', () => {
      expect(formatDate(' 05/10/2023 ')).toBe('05/10/2023');
    });
  });


});
