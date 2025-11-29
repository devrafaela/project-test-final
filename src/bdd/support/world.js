// =====================================================
// AQUI GARANTIMOS QUE O MOCK É SEMPRE CARREGADO
// =====================================================

console.log('[BDD DEBUG] carregando world.js');

// Importa o mock
import "../mock/localStorageMock.js";

// Cucumber exige um default export (mesmo vazio)
export default function () {}
