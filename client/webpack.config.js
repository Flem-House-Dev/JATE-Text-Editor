const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Super Cool App',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),
      new WebpackPwaManifest({
        name: 'Super Cool App',
        short_name: 'Cool App',
        description: 'The coolest app in the world',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        fingerprints: false,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
            filename: 'icon-[size].png',
          },
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'favicon.ico', to: 'favicon.ico' },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            sources: {
              list: [
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src',
                },
                {
                  tag: 'link',
                  attribute: 'href',
                  type: 'src',
                },
              ],
            },
          },
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        }
      ],
    },
  };
};
