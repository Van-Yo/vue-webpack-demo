const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackUtils = require('./webpack.utils');
const config = webpackUtils.getBaseConfig();
const globalData = webpackUtils.getGlobalData();
const webpackConfig = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    mode: 'development',
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                components: {
                    test: /[\\/]components[\\/]/,
                    name: 'components',
                    chunks: 'all'
                }
            }
        },
    },
    module: {
        //  webpack 加载各式各样的文件所需要的 loader
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: {
                    loader: 'vue-loader'
                }
            }, 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'), 
            filename: 'index.html' 
        }),
        new webpack.DefinePlugin(globalData),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from:'src/assets/static',
            to: 'assets/static',
            toType: 'dir'
        }])
    ],
    resolve: {
        // 依赖
        alias: config.alias
    },
};
module.exports = webpackConfig;