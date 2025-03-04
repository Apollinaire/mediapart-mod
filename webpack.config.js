var webpack = require('webpack'),
  path = require('path'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  WriteFilePlugin = require('write-file-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production';
var browser = process.env.BROWSER || 'chrome';

var options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    interactionController: path.join(__dirname, 'src', 'interactionController.js'),
    injectTheme: path.join(__dirname, 'src', 'injectTheme.js'),
    background: path.join(__dirname, 'src', 'background.js'),
    popup: path.join(__dirname, 'src', 'popup.js'),
    options: path.join(__dirname, 'src', 'options.js'),
  },
  output: {
    path: path.join(__dirname, isProduction ? `dist/${browser}` : 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(html|svelte)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              css: true,
              dev: !isProduction,
            },
          },
        },
      },
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.css', '.less', '.json', '.js', '.mjs', '.svelte'],
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    mainFields: ['svelte', 'browser', 'module', 'main'],
    conditionNames: ['svelte'],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    // clean the dist folder before build
    // in dev mode cleaning the folder conflicts with the extension reload
    new CleanWebpackPlugin({
      dry: !isProduction,
      cleanOnceBeforeBuildPatterns: ['**/*', path.join(process.cwd(), 'dist', browser, '*.zip')],
    }),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          transform: function (content, path) {
            // generates the manifest file using the package.json informations

            const manifest = {
              ...JSON.parse(content.toString()),
            };

            if (browser === 'firefox') {
              // firefox does not support service_worker
              manifest.background = {
                scripts: [manifest.background.service_worker],
              };
              manifest.browser_specific_settings = {
                gecko: {
                  id: '{7a408999-c95d-48a1-9b76-eb7189616efe}',
                },
              };
            }

            return Buffer.from(JSON.stringify(manifest));
          },
        },
        {
          from: 'public',
        },
        {
          from: 'node_modules/ress/dist/ress.min.css',
        },
      ],
    }),
    new WriteFilePlugin(),
  ],
};

module.exports = options;
