const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
    return {
        mode: process.env.NODE_ENV,
        entry: {
          main: './src/index.js',
          theme: './src/theme/index.js',
          glitch: './src/glitch/index.js',
        },
        devtool: process.env.NODE_ENV == 'production' ? false : 'source-map',
        devServer: {
          contentBase: path.join(__dirname, 'dist'),
          compress: true,
          port: 3000
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'js/[name].js',
            sourceMapFilename: '[name].map.js'
        },
        optimization: {
            minimize: process.env.NODE_ENV == 'production',
            minimizer: [
                new TerserPlugin({
                    cache: true,
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }
                },
                {
                  test: /\.s[ac]ss$/i,
                  use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    {
                      loader: 'sass-loader',
                      options: {
                        sourceMap: true,
                        sassOptions: {
                          outputStyle: 'compressed',
                        },
                      },
                    },
                  ],
                },
                {
                  test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                  loader: 'file-loader',
                  options: {
                    publicPath: '../assets/fonts/',
                    outputPath: '/assets/fonts/',
                    name: '[name].[ext]',
                  },
                },
            ]
        },
        plugins: [
          new HTMLWebpackPlugin({
            filename: 'index.html',
            template: `${__dirname}/index.html`
          }),
          new MiniCssExtractPlugin({
            filename: 'css/style.css',
            chunkFilename: '[id].css',
          }),
        ]
    }
}