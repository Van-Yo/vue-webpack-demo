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

## 引入样式重置文件和自定义样式文件(全局)和全局的scss颜色管理文件
此时首页里一共有三个style内联样式，分别是引入样式重置文件、自定义样式文件和首页自身设置的样式

## rem布局
```
(function () {
    // window.onresize监听屏幕的改变从而改变默认字体大小
    var countRem = function () {
        var documentElement = document.documentElement;
        var width = documentElement.clientWidth;
        documentElement.style.fontSize = 100 * (width / 360) + 'px';
    };
    countRem();
    window.onresize = countRem;
})();
```
假如width的宽度width就是360px,那么360份每份的宽度就是100px,全局字体也就是100px,1rem等于100px,此时若样式图中图片是180px,就需要除以100等于1.8rem;
当页面按照此rem定局后,页面样式会随着浏览器宽度变化而等比例变化,包括其中的文字和图片等。

## PostCSS及其插件Autoprefixer
>Autoprefixer 是一个流行的 PostCSS 插件，其作用是为 CSS 中的属性添加浏览器特定的前缀。由于 CSS 规范的制定和完善一般需要花费比较长的时间，浏览器厂商在实现某个 CSS 新功能时，会使用特定的浏览器前缀来作为正式规范版本之前的实验性实现。比如 Webkit 核心的浏览器使用-webkit-，微软的 IE 使用-ms-。为了兼容不同浏览器的不同版本，在编写 CSS 样式规则声明时通常需要添加额外的带前缀的属性。这是一项繁琐而无趣的工作。Autoprefixer 可以自动的完成这项工作。Autoprefixer 可以根据需要指定支持的浏览器类型和版本，自动添加所需的带前缀的属性声明。开发人员在编写 CSS 时只需要使用 CSS 规范中的标准属性名即可。

## 项目文件路径目录映射
每次引入文件的时候就不需要再一层一层的查看文件路径，比如：
```
// import './src/assets/css/public.scss';
import '@assets/css/public.scss';
```

## 获取全局数据配置
```
plugins: [
    //获取全局数据
    new webpack.DefinePlugin(globalData),
],
```

## clean-webpack-plugin
>webpack 会生成文件，然后将这些文件放置在 /dist 文件夹中，但是 webpack 无法追踪到哪些文件是实际在项目中用到的。通常，在每次构建前清理 /dist 文件夹，是比较推荐的做法，因此只会生成用到的文件。

## 生产环境和测试环境分块打包及压缩

## 全局组件和全局样式
- footerBar和noData组件
- 组件目录映射
- 挂载到全局vue实例
- @mixin全局样式,以后只需要@include引入即可
```
@mixin com-container(){
    height: 100vh;
    background: $c-bg;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
.container{
    @include com-container;
    padding-bottom: 0.48rem;
}
```

## 404页、其他路由模块和页面title
- 404页面配置,路由：
```
const errorList = [{
    path: '*',
    redirect: '/error-page'
}];
```
- 路由模块配置，使得打包的时候按照模块来打包
```
// /* webpackChunkName: "member" */ 不可省略
component: () => import(/* webpackChunkName: "member" */'@pages/member/MemberDetail.vue'),
```
- 利用路由钩子来配置页面title
```
//路由钩子
index.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
```
