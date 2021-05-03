var webpack = require('webpack'),
  path = require('path'),
  ExtensionReloader = require('webpack-extension-reloader'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  WriteFilePlugin = require('write-file-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production';

var options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    content: path.join(__dirname, 'src', 'injectTheme.js'),
    background: path.join(__dirname, 'src', 'background.js'),
  },
  output: {
    path: path.join(__dirname, isProduction ? 'dist/raw' : 'build'),
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
        test: /\.json$/,
        use: {
          loader: 'file-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.css', '.json', '.js'],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    // clean the dist folder before build
    // in dev mode cleaning the folder conflicts with the extension reload
    new CleanWebpackPlugin({
      dry: !isProduction,
      cleanOnceBeforeBuildPatterns: ['**/*', path.join(process.cwd(), 'dist', '*.zip')],
    }),
    new ExtensionReloader({
      PORT: 9090,
      entries: {
        contentScript: 'content',
        background: 'background',
      },
      reloadPage: true,
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

            if (!isProduction) {
              // we need unsafe-eval for autoreload, but not in prod
              manifest.content_security_policy = "script-src 'self' 'unsafe-eval'; object-src 'none'";
            }

            return Buffer.from(JSON.stringify(manifest));
          },
        },
        {
          from: 'public'
        }
      ],
    }),
    new WriteFilePlugin(),
  ],
};

// add zip file
if (isProduction) {
  // options.plugins.push(
  //   new ZipPlugin({
  //     path: '..',
  //     filename: 'mediapart-mod.zip',
  //   })
  // );
}

module.exports = options;
