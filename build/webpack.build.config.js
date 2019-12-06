/**
 * @Author: Vanlus
 * @Description: 测试包生产包构建配置
 * @Date: 2019/12/6 09:39:03
 */
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const base = require('./webpack.base.config');
const webpackUtils = require('./webpack.utils');
const config = webpackUtils.getBaseConfig();
const webpackConfig = merge(base, {
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash].js',
        chunkFilename: 'js/[name].[contenthash].js',
    },
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
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
                MiniCssExtractPlugin.loader,
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
                    name: 'assets/img/[name].[contenthash].[ext]',
                    publicPath: config.publicPath
                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css',
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});
module.exports = webpackConfig;