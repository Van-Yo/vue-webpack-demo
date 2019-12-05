const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./webpack.base.config.js');
const baseDevServer = {
    contentBase: path.join(__dirname, 'dist'),
    port: 8087,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
};
const webpackConfig = merge(base,{
    output: {
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js',
    },
    module: {
        //  webpack 加载各式各样的文件所需要的 loader
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    'style-loader',
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
                        name: 'assets/img/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: baseDevServer,
    devtool: 'inline-source-map'
});
module.exports = webpackConfig;