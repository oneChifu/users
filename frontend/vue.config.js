const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],

  devServer: {
    proxy: {
      '/api': {
        target: 'http://server:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
