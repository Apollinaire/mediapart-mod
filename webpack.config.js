var webpack = require("webpack"),
  path = require("path"),
  fileSystem = require("fs"),
  env = require("./utils/env"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  ExtensionReloader = require("webpack-extension-reloader"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  WriteFilePlugin = require("write-file-webpack-plugin");

var options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    content: path.join(__dirname, "src", "injectTheme.js"),
    background: path.join(__dirname, "src", "background.js"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        use: {
          loader: "file-loader",
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".css", ".json", ".js"],
  },
  plugins: [
    // clean the build folder
    // new CleanWebpackPlugin(),
    new ExtensionReloader({
      PORT: 9090,
      entries: {
        contentScript: "content",
        background: "background",
      },
      reloadPage: true,
    }),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
        {
          from: "src/darktheme.css",
        },
      ],
    }),
    new WriteFilePlugin(),
  ],
};

if (env.NODE_ENV === "development") {
  // options.devtool = "eval-cheap-source-map";
}

module.exports = options;
