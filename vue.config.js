const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // Paths
    host: 'localhost',
    port: '8080',
    https: false,
    open: true,
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://101.43.113.43:8080', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      },
    }
  }
})
