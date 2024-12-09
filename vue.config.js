const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'dependency-name' // List any dependencies you need to transpile
  ],
});
