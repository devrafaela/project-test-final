// Funções auxiliares compartilhadas (ex: para validações ou simulações)
export function isEmpty(value) {
  return !value || value.trim() === '';
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}