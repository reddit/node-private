module.exports = [{
  name: 'index',
  webpack: {
    entry: {
      index: './lib/private.es6.js',
    },
    output: {
      library: "[name].js",
      libraryTarget: "umd",
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
      // 'minify-and-treeshake',
      'abort-if-errors',
    ],
    externals: {
      atob: 'commonjs atob',
      superagent: 'commonjs superagent',
      url: 'commonjs url',
    },
  },
}];
