/**
 * @Author: Vanlus
 * @Description: 基础的webpack配置项
 * @Date: 2019/12/5 19:42:03
 */
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
                vendors: {
                    test: /[\\/]node_modules[\\/](vue|vuex|vue-router|axios)[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                components: {
                    test: /[\\/]components[\\/]/,
                    name: 'components',
                    chunks: 'all'
                }
            }
        }
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
            filename: 'index.html',
            // index.html压缩
            minify: {
                collapseWhitespace: true
            }
        }),
        new webpack.DefinePlugin(globalData),
        new CleanWebpackPlugin(),
        // 文件拷贝
        new CopyWebpackPlugin([{
            from:'src/assets/static',
            to: 'assets/static',
            toType: 'dir'
        }])
    ],
    resolve: {
        // 依赖
        alias: config.alias,
        // 引入下列后缀的文件时后缀可省略
        extensions: ['.js', '.vue']
    },
};
module.exports = webpackConfig;