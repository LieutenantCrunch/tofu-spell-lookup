const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './src/js/index.jsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(tt|ot|wof)f$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/f/[name][ext]'
                }
            }
        ]
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/styles.[contenthash].css'
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};
