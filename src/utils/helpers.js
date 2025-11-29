// Arquivo de Utilitários Compartilhados
// Contém funções auxiliares que podem ser reutilizadas em vários módulos do projeto
// Essas funções ajudam a manter o código limpo e evitam repetição

// Função para verificar se um valor está vazio ou nulo
// Útil para validações rápidas em formulários
export function isEmpty(value) {
  // Retorna true se o valor for falsy (null, undefined, string vazia ou só espaços)
  return !value || value.trim() === '';
}

// Função para capitalizar a primeira letra de uma string
// Pode ser usada para formatar nomes ou textos de exibição
export function capitalize(str) {
  // Converte o primeiro caractere para maiúsculo e mantém o resto inalterado
  return str.charAt(0).toUpperCase() + str.slice(1);
}