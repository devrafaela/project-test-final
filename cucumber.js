// ============================================================
// Configuração do Cucumber para ES Modules
// ============================================================

export default {
  default: {
    // Arquivos necessários antes de executar os steps
    require: [
      "src/bdd/support/world.js",           // Carrega o mock do localStorage
      "src/bdd/step-definition/**/*.js"     // Carrega todos os step definitions
    ],
    // Localização das features
    paths: [
      "src/bdd/features/*.feature"
    ],
    // Evita publicação de resultados no Cucumber Cloud
    publishQuiet: true,
    // Tempo limite de cada step (opcional)
    //timeout: 5000
  }
};
