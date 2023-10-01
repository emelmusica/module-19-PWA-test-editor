const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: 'Develop/client/src/js/index.js',
      install: 'Develop/client/src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'Develop/client/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      new WebpackPwaManifest({
        name: 'Our Text Editor App',
        short_name: 'Text Editor',
        description: 'A text editor web application',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('Develop/client/src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      new InjectManifest({
        swSrc: 'Develop/client/src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
