const HtmlWebpackPlugin = require('html-webpack-plugin');
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
            }
        ]
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist/js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};
