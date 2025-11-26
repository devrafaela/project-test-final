module.exports = {
  default: {
    require: ['src/bdd/step-definitions/**/*.js'],
    format: ['progress'],
    paths: ['src/bdd/features/**/*.feature']
  }
};