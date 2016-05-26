var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: "./assets/js/app.js"
  },
  output: {
    path: __dirname + "/dist/",
    filename: "[name].build.js",
  },
  module: {
    loaders: [
      // Extract css files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      // Optionally extract less files
      // or any other compile-to-css language
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      }
      // You could also use other loaders the same way. I. e. the autoprefixer-loader
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.css", {
      allChunks: true
    })
  ]
}