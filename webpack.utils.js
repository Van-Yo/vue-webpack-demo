const path = require('path');
/**
 * webpack构建辅助函数
*/
class webpackUtils{
    constructor(){}
    /**
     * 项目文件路径目录映射
     */
    getProjectAlias(){
        return{
            'vue': 'vue/dist/vue.js', //vue 文件映射
            '@assets': path.resolve(__dirname, './src/assets'), //静态文件目录映射
            '@pages': path.resolve(__dirname, './src/pages'), //页面目录映射
            '@router': path.resolve(__dirname, './src/router'), //路由目录映射
        };
    }
    /**
     * 全局配置
     */
    getBaseConfig(){
        let config = {};
        config.alias = this.getProjectAlias();
        return config;
    }
}
module.exports = new webpackUtils();