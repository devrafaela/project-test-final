// Módulo TDD: Formatação de Data
// Converte datas de DD/MM/AAAA ou AAAA-MM-DD para formato brasileiro (DD/MM/AAAA)
export function formatDate(dateString) {
  if (typeof dateString !== 'string') return null;

  // --- CORREÇÃO MINIMA (GREEN): remover espaços externos
  dateString = dateString.trim();

  let normalizedDate = dateString;

  if (dateString.includes('/')) {
    const parts = dateString.split('/');
    if (parts.length !== 3) return null; // falha se formato incompleto
    normalizedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  } else if (dateString.includes('-')) {
    const parts = dateString.split('-');
    if (parts.length !== 3) return null; // falha se formato incompleto
  } else {
    return null; // falha se não tem '/' nem '-'
  }

  const date = new Date(normalizedDate);
  if (isNaN(date)) return null;

  // Ajusta fuso horário UTC-3 para Brasil
  date.setHours(date.getHours() + 3);

  return date.toLocaleDateString('pt-BR');
}