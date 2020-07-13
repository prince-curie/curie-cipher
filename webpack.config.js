const path = require('path');

const webConfig = {
  entry: './src/index.js',
  target: 'web',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'web.index.js',
    library: 'CurieCipher.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
		globalObject: 'this',
  },
}


module.exports = webConfig
