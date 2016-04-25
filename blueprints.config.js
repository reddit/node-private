module.exports = [{
  name: 'index',
  webpack: {
    entry: './lib/private.es6.js',
    output: {
      generator: 'simple',
      dest: './bin',
    },
    externals: {
      atob: 'atob',
      superagent: 'superagent',
      url: 'url',
    },
    resolve: {
      generator: 'npm-and-modules',
      extensions: ['', '.js', '.jsx', '.es6.js', '.json'],
    },
    loaders: [
      'esnextreact',
      'json',
    ],
    plugins: [
      'production-loaders',
      'set-node-env',
      'minify-and-treeshake',
      'abort-if-errors',
    ],
  },
}];
