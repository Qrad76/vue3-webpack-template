//import
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

// export
module.exports = {
  resolve: {
    extensions: [".js", ".vue"],
    //경로 별칭
    alias: {
      "~": path.resolve(__dirname, "src"),
      assets: path.resolve(__dirname, "src/assets"),
    },
  },
  entry: "./src/main.js", //파일을 읽어기 시작하는  진입점

  output: {
    // 결과물(번들) 을 반환하는 설정
    // path: path.resolve(__dirname, 'dist'),  // default가 dist로 설정되어있어 구지 명시해주지 않아도 됨
    // filename: 'main.js',       생략시 entry에 적었던 파일이름으로 설정됨
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.s?css$/,
        use: [
          "vue-style-loader",
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: "file-loader",
      },
    ],
  },

  plugins: [
    //번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    new HtmlPlugin({
      template: "./index.html",
    }),

    new CopyPlugin({
      patterns: [
        {
          from: "static",
        },
      ],
    }),
    new VueLoaderPlugin(),
  ],

  devServer: {
    host: "localhost",
  },
};
