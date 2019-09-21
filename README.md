# vue-webpack-demo
custom Vue.js &amp;&amp; Webpack demo

## 项目初始化
- 1.引入package.json
- 2.运行npm i 装包
- 3.新建.gitignore,.eslintrc.js,.babelrc,并配置
- 4.新建src文件夹，里面是vue最基本的挂载和路由
- 5.新建webpack.config.js,配置webpack配置文件,主要包括如下：
```
const webpackConfig = {
    entry: '',
    output: {},
    mode: 'development',
    module: {},
    plugins: [],
    devServer : {}
};
module.exports = webpackConfig;
```