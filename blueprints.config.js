module.exports = [{
  name: 'index',
  webpack: {
    entry: './lib/private.es6.js',
    output: {
      generator: 'umd',
      dest: './bin',
    },
    resolve: {
      generator: 'npm-and-modules',
      extensions: ['', '.js', '.jsx', 'es6.js', '.json'],
    },
    loaders: [
      'esnextreact',
      'json',
    ],
    plugins: [
      'abort-if-errors',
    ],
  },
}];
