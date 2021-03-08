const path = require('path');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/dist_2021/admin/' : '/',
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '后台管理系统'
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.ftqrcodepay.com/dist_2021/api',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/css/variable.less')
      ]
    }
  },
  runtimeCompiler: true
};
