const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const fileOptions = {
  css: ['app.bundle.css'],
  js: ['app.bundle.js'],
  chunks: {
    head: {
      //? entry 란 js..
      entry: '',
      css: 'app.bundle.css',
    },
    body: {
      entry: 'app.bundle.js',
      css: '',
    },
  },
};

module.exports = {
  entry: './src/assets/js/app.js',
  //? 웹팩이 번들파일을 만들어서 보내주는 path
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/app.bundle.js',
    publicPath: '/dist/',
  },
  devServer: {
    contentBase: __dirname + '/dist',
    port: 3000,
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        //? node_modules까지 변환 할 필요가 없으므로
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader?name=assets/images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=50000&name=assets/webfonts/[name].[ext]',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{ from: './src/assets/images', to: './assets/images' }]),
    new CopyWebpackPlugin([{ from: './src/assets/webfonts', to: './assets/webfonts' }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      //! src/index.html의 html파일을 자동으로 dist폴더 밑에 index.html로 만들어준다.
      //? 왜 dist인가? 위의 output의 path를 dist라고 지정해놓았기 떄문에
      //* 이것이 바뀌면 path도 바뀔 것 !
      template: 'src/index.html',
      files: fileOptions,
    }),
    new HtmlWebpackPlugin({
      filename: 'intro.html',
      template: 'src/intro.html',
      files: fileOptions,
    }),
    new ExtractTextWebpackPlugin('assets/css/app.bundle.css'),
  ],
};
