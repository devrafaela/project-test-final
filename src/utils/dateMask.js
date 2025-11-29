// src/tdd/utils/dateMask.js
// Máscara de digitação para campo de data (DD/MM/AAAA)
// Limita entrada a exatamente 10 caracteres e impede datas incompletas

/**
 * Aplica máscara de data em DD/MM/AAAA enquanto o usuário digita
 * @param {Event} event - evento de input do campo
 */
export function applyDateMask(event) {
  let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

  // Limita a 8 dígitos (DDMMYYYY)
  value = value.slice(0, 8);

  // Adiciona barras
  if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
  if (value.length >= 6) value = value.slice(0, 5) + '/' + value.slice(5);

  event.target.value = value;
}
