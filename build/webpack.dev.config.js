/**
 * @Author: Vanlus
 * @Description: 基础的webpack配置项
 * @Date: 2019/12/5 19:42:03
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./webpack.base.config.js');
const webpackConfig = merge(base,{
    output: {
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js',
    },
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                {
                    loader: 'less-loader',
                    options: {
                        globalVars: {
                            'PRIMARY_COLOR': '',
                            'theme': ''
                        }
                    }
                }
            ]
        }, {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        data : '@import "@assets/css/color.scss";'
                        /* prependData: `$theme : '${configOptions.primaryColor}';` */
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: '4096',
                    name: 'assets/img/[name].[ext]',
                    publicPath: '/'
                }
            }]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8087,
        host: '0.0.0.0',
        hot: true,
        historyApiFallback: true,
        clientLogLevel: 'warning'
    },
    devtool: 'inline-source-map'
});
module.exports = webpackConfig;