const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true // 确保依赖包是被babel转译的，从而提高兼容性
})
