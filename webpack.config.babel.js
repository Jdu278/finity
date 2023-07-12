import path from 'path';

export default {
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'Finity',
    libraryTarget: 'umd',
    filename: 'Finity.js',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },

  devtool: 'source-map',
};
