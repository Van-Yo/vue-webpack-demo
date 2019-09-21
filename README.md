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

## HTML5 History 模式
问题：为什么URL是这样的：http://localhost:8087/#/home
>vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。

问题：可以将URL换成这样了http://localhost:8087/home,但刷新时返回404
>不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问就会返回 404。所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。