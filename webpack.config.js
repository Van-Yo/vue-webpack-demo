const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackUtils = require('./webpack.utils');
const config = webpackUtils.getBaseConfig();
const globalData = webpackUtils.getGlobalData();
const webpackConfig = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bundle.js',
    },
    mode: 'development',
    module: {
        //  webpack 加载各式各样的文件所需要的 loader
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader : 'sass-loader',
                        options : {
                            data : '@import "@assets/css/color.scss";'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/,
                use: [{
                    loader: 'url-loader',
                    // 当图片小于4096B时，就将其转为base64编码
                    // 否则就去依赖 file-loader
                    // url-loader 底层依赖 file-loader
                    options: {
                        limit: 4096,
                        name: 'assets/img/[name].[ext]',
                    }
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), 
            filename: 'index.html' 
        }),
        new webpack.DefinePlugin(globalData),
        new CleanWebpackPlugin(),
    ],
    devServer : {
        contentBase: path.join(__dirname, 'dist'),
        port: 8087,
        host: '0.0.0.0',
        hot: true,
        historyApiFallback: true,
    },
    resolve: {
        // 依赖
        alias: config.alias
    },
};
module.exports = webpackConfig;