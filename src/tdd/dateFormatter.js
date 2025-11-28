// ============================================================
// Módulo TDD: Formatação de Data
// ============================================================
// Converte datas de DD/MM/AAAA ou AAAA-MM-DD para DD/MM/AAAA (pt-BR)

// ============================================================
// GREEN - versão mínima funcional antes da refatoração
// ============================================================

// export function formatDate(dateString) {
//   if (typeof dateString !== 'string') return null;
//   dateString = dateString.trim();

//   let normalizedDate = dateString;

//   if (dateString.includes('/')) {
//     const parts = dateString.split('/');
//     if (parts.length !== 3) return null; // falha se formato incompleto
//     normalizedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
//   } else if (dateString.includes('-')) {
//     const parts = dateString.split('-');
//     if (parts.length !== 3) return null; // falha se formato incompleto
//   } else {
//     return null; // falha se não tem '/' nem '-'
//   }

//   const date = new Date(normalizedDate);
//   if (isNaN(date)) return null;

//   // Ajusta fuso horário UTC-3
//   date.setHours(date.getHours() + 3);

//   return date.toLocaleDateString('pt-BR');
// }

// ============================================================
// REFACTOR - versão final limpa e modular
// ============================================================

const TZ_OFFSET_HOURS = 3; // ajuste para UTC-3

// Função auxiliar: valida array de partes
function isValidParts(parts, expectedLength = 3) {
  return Array.isArray(parts) && parts.length === expectedLength;
}

// Função auxiliar: converte [dia, mes, ano] em AAAA-MM-DD
function toNormalizedDateStringFromSlash(parts) {
  const [d, m, y] = parts;
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

// Função principal: formata data para DD/MM/AAAA
export function formatDate(dateString) {
  if (typeof dateString !== 'string') return null;

  // Trim da entrada (proteção contra espaços)
  dateString = dateString.trim();

  let normalizedDate = dateString;

  if (dateString.includes('/')) {
    const parts = dateString.split('/');
    if (!isValidParts(parts)) return null; // falha se formato incompleto
    normalizedDate = toNormalizedDateStringFromSlash(parts); // refatorado
  } else if (dateString.includes('-')) {
    const parts = dateString.split('-');
    if (!isValidParts(parts)) return null; // falha se formato incompleto
    // normalizedDate já está no formato AAAA-MM-DD
  } else {
    return null; // formato inválido
  }

  const date = new Date(normalizedDate);
  if (isNaN(date.getTime())) return null;

  // Ajuste de fuso horário (UTC-3)
  date.setHours(date.getHours() + TZ_OFFSET_HOURS);

  return date.toLocaleDateString('pt-BR');
}
