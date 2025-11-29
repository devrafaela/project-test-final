export default {
  default: {
    require: [
      "src/bdd/support/world.js",
      "src/bdd/step-definition/**/*.js"
    ],
    paths: [
      "src/bdd/features/*.feature"
    ],
    publishQuiet: true
  }
};
