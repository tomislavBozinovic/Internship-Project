const path =  require('path');

module.exports = {
    devServer: {
      port: process.env.CLIENT_PORT || 4100,
      proxy: {
        '/api': {
          target: 'http://localhost:4101/',
          pathRewrite: { '/api': '' },
        },
        '/api/item': {
          target: 'http://localhost:4101/item',
        }
      }
    },
    pages: {
      index: {
        entry: 'client/src/main.js',
        template: 'public/index.html',
        filename: 'index.html',
        title: 'Index Page',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      }
    },
    configureWebpack: {  
      resolve: {  
        alias: {  
          '@api': path.resolve(__dirname, './client/api')
        },  
      },
    }
}