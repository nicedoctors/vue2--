const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'./',
  productionSourceMap:false,
  transpileDependencies: true,
  //爆杀eslint
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
      },
    }
  },
  
})
