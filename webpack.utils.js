const path = require('path');
/**
 * webpack构建辅助函数
*/
class webpackUtils{
    constructor(){
        this.ENV = process.env.npm_lifecycle_event;
    }
    /**
     * 项目文件路径目录映射
     */
    getProjectAlias(){
        return{
            'vue': 'vue/dist/vue.js', //vue 文件映射
            '@assets': path.resolve(__dirname, './src/assets'), //静态文件目录映射
            '@pages': path.resolve(__dirname, './src/pages'), //页面目录映射
            '@router': path.resolve(__dirname, './src/router'), //路由目录映射
            '@components': path.resolve(__dirname, './src/components'), //组件目录映射
            '@utils': path.resolve(__dirname, './src/utils'), //工具目录映射
        };
    }
    /**
     * 全局配置
     */
    getBaseConfig(){
        let config = {};
        config.alias = this.getProjectAlias();
        config.env = this.ENV;
        config.compressFlag = this.getCompressFlag();
        return config;
    }
    /**
     * 获取全局数据配置
     */
    getGlobalData() {
        return {
            ENV: JSON.stringify(this.ENV),
        };
    }
    /**
     * 依据环境判断是否要压缩
     * false:测试环境不压缩
     * true:生产环境或者测试环境压缩
     */
    getCompressFlag(){
        return this.ENV == 'prod' || this.ENV == 'test';
    }
}
module.exports = new webpackUtils();