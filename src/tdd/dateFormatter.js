// Módulo TDD: Formatação de Data (Funcionalidade Adicional)
// Este arquivo formata datas, agora aceitando entrada em DD/MM/AAAA
// Converte para AAAA-MM-DD para validação interna

// Função para formatar uma data de string para o formato brasileiro
// Agora aceita entrada em DD/MM/AAAA e converte para validação
export function formatDate(dateString) {
  // Primeiro, tenta converter de DD/MM/AAAA para AAAA-MM-DD (se necessário)
  let normalizedDate = dateString;
  if (dateString.includes('/')) {
    // Divide a string em dia, mês, ano
    const parts = dateString.split('/');
    if (parts.length === 3) {
      // Reordena para AAAA-MM-DD
      normalizedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
  }
  // Cria um objeto Date a partir da string normalizada
  const date = new Date(normalizedDate);
  // Se a data for inválida (NaN), retorna null para indicar erro
  if (isNaN(date)) return null;
  // Retorna a data formatada no padrão brasileiro (ex: 05/10/2023)
  return date.toLocaleDateString('pt-BR'); // Formato localizado para PT-BR
}