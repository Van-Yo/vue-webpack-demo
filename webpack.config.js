const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackUtils = require('./webpack.utils');
const config = webpackUtils.getBaseConfig();
const globalData = webpackUtils.getGlobalData();
const compressFlag = webpackUtils.getCompressFlag();
const webpackConfig = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: compressFlag?'js/[name].[contenthash].bundle.js':'js/[name].bundle.js',
        chunkFilename: compressFlag?'js/[name].[contenthash].chunk.js':'js/[name].chunk.js',
        publicPath: '/'
    },
    mode: compressFlag?'production':'development',
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
                    compressFlag?MiniCssExtractPlugin.loader:'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    compressFlag?MiniCssExtractPlugin.loader:'vue-style-loader',
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
                        name: compressFlag ? 'assets/img/[name].[contenthash].[ext]' : 'assets/img/[name].[ext]',
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
        new CleanWebpackPlugin()
    ],
    resolve: {
        // 依赖
        alias: config.alias
    },
};
if(!compressFlag){
    webpackConfig.devServer = {
        contentBase: path.join(__dirname, 'dist'),
        port: 8087,
        host: '0.0.0.0',
        hot: true,
        historyApiFallback: true,
    };
    webpackConfig.devtool = 'cheap-module-eval-source-map';
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}else{
    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].bundle.css',
            chunkFilename: 'css/[name].[contenthash].chunk.css'
        }),
    );
    webpackConfig.optimization.minimizer = [
        new UglifyJsPlugin({
            chunkFilter: (chunk) => {
                // 对除了node_modules中的js压缩
                if (chunk.name === 'vendor') {
                    return false;
                }
                return true;
            }
        }),
        new OptimizeCSSAssetsPlugin({}),
    ];
}
module.exports = webpackConfig;