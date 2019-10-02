const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/assets/js/app.js',
  //? 웹팩이 번들파일을 만들어서 보내주는 path
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/app.bundle.js',
  },
  mode: 'development',
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
        test: /\.s?css$/,
        //? 이 순서를 지켜야한다!
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
  plugins: [new CopyWebpackPlugin([{ from: './src/assets/images', to: './assets/images' }])],
};
