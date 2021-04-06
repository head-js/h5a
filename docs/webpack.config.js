const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const DEV_HOST = '0.0.0.0';
const DEV_PORT = '3001';


const DEV_SERVER = 'webpack-dev-server/client?http://' + DEV_HOST + ':' + DEV_PORT;
const HOT_SERVER = 'webpack/hot/only-dev-server';


module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.css', '.scss', '.less'],
  },

  entry: {
    'index': './src/index',
  },

  output: {
    filename: '[name]-ha5h.js',
    publicPath: 'http://' + DEV_HOST + ':' + DEV_PORT + '/rsrc/dist/',
  },

  module: {
    rules: [
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]-[hash:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules', 'vant')],
        use: [ 'vue-style-loader', 'css-loader' ],
      },
      {
        test: /\.less$/,
        include: [path.resolve(__dirname, 'node_modules', 'iview')],
        use: [ 'vue-style-loader', 'css-loader', 'less-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(__dirname, 'node_modules', 'iview/src/styles/mixins/*'),
                path.resolve(__dirname, 'node_modules', 'iview/src/styles/custom.less'),
                path.resolve(__dirname, 'node_modules', 'iview/src/styles/components/checkbox.less'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ],
  },

  // node: {
  //   fs: 'empty'
  // },
  // resolve: {
  //   alias: {
  //     vue: 'vue/dist/vue.js'
  //   },
  //   modules: [path.resolve(__dirname, 'node_modules')],
  // },

  plugins: [
    new VueLoaderPlugin()
  ],

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    host: DEV_HOST,
    port: DEV_PORT,
    sockPort: DEV_PORT,
    historyApiFallback: true,
    hot: true,
    stats: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
