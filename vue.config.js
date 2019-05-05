// var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  'baseUrl': './',
  'productionSourceMap': false,
  'configureWebpack': {
    // 'plugins': [
    //   new CopyWebpackPlugin([
    //     { 'from': './src/common', 'to': './common' }
    //   ])
    // ],
    // resolve: {
    //   extensions: ['.ts', '.tsx', '.js']
    // },
    // 'module': {
    //   'rules': [
    //     {
    //       'test': /\.ts$/,
    //       'use': 'ts-loader',
    //       'exclude': /node_modules/
    //     }
    //   ]
    // },
    'node': {
      'fs': 'empty'
    }
  },
  'css': {
    'extract': false,
    'sourceMap': false,
    'modules': false,
    'loaderOptions': {}
  },
  'lintOnSave': true
}
