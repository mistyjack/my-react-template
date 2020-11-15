const currentTask = process.env.npm_lifecycle_event
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const fse = require("fs-extra")

const postCSSPlugins = [require("postcss-import"), require("postcss-mixins"), require("postcss-simple-vars"), require("postcss-nested"), require("postcss-hexrgba"), require("autoprefixer")]

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy images", function () {
      fse.copySync("./app/assets/images", "./dist/assets/images")
    })
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: ["css-loader?url=false", { loader: "postcss-loader", options: { postcssOptions: { plugins: postCSSPlugins } } }]
}

let jsConfig = {
  test: /\.js$/,
  exclude: /(node_modules)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
    }
  }
}

let imgConfig = {
  test: /\.(png|jpe?g|gif)$/i,
  use: {
    loader: "file-loader"
  }
}

let config = {
  entry: "./app/assets/scripts/App.js",
  output: {
    publicPath: "/",
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "app/index.html",
      alwaysWriteToDisk: true
    })
  ],
  module: {
    rules: [cssConfig, jsConfig, imgConfig]
  }
}

if (currentTask == "dev") {
  cssConfig.use.unshift("style-loader")
  config.devServer = {
    before: function (app, server) {
      server._watch("./app/**/*.html")
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0",
    historyApiFallback: { index: "index.html" }
  }
  config.mode = "development"
}

if (currentTask == "build") {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  postCSSPlugins.push(require("cssnano"))
  config.output = {
    publicPath: "/",
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist")
  }
  config.mode = "production"
  config.optimization = {
    splitChunks: { chunks: "all" }
  }
  config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: "styles.[chunkhash].css" }), new RunAfterCompile())
}

module.exports = config
