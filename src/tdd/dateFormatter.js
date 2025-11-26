// Módulo TDD: Formatação de Data (Funcionalidade Adicional)
// Este arquivo contém uma função para formatar datas
// Integrado ao módulo de validação para enriquecer os testes

// Função para formatar uma data de string para o formato brasileiro
// Converte "YYYY-MM-DD" para "DD/MM/YYYY"
export function formatDate(dateString) {
  // Cria um objeto Date a partir da string
  const date = new Date(dateString);
  // Se a data for inválida, retorna null
  if (isNaN(date)) return null;
  // Retorna a data formatada no padrão brasileiro
  return date.toLocaleDateString('pt-BR'); // Exemplo: "05/10/2023"
}