const path = require('path');
/**
 * webpack构建辅助函数
*/
class webpackUtils{
    constructor(){
        const TARGET = process.env.npm_lifecycle_event;
        this.PROJECTNAME = TARGET.split('-')[0]; //项目名称
        this.ENV = TARGET.split('-')[1]; //项目环境
    }
    /**
     * 所有项目公用文件目录映射
    */
    getCommonAlias() {
        return {
            'vue': this.getCompressFlag() ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',//vue 文件映射
            '@cs': path.resolve(__dirname, '../common/static'), //公用的静态文件目录映射
            '@cc': path.resolve(__dirname, '../common/components'), //公用的vue组件目录映射
            '@cu': path.resolve(__dirname, '../common/utils'), //公用的工具方法目录映射
            '@cd': path.resolve(__dirname, '../common/directive'), //公用的指令目录映射
        };
    }
    /**
     * 各项目文件路径目录映射
    */
    getProjectAlias(projectName){
        return{
            '@assets': path.resolve(__dirname, `../projects/${projectName}/assets`), //静态文件目录映射
            '@pages': path.resolve(__dirname, `../projects/${projectName}/pages`), //页面目录映射
            '@router': path.resolve(__dirname, `../projects/${projectName}/router`), //路由目录映射
            '@components': path.resolve(__dirname, `../projects/${projectName}/components`), //组件目录映射
            '@utils': path.resolve(__dirname, `../projects/${projectName}/utils`), //工具目录映射
            '@mixins': path.resolve(__dirname, `../projects/${projectName}/mixins`), //混入目录映射
            '@requests': path.resolve(__dirname, `../projects/${projectName}/requests`), //请求接口目录映射
            '@store': path.resolve(__dirname, `../projects/${projectName}/store`) //请求接口目录映射
        };
    }
    /**
     * 全局配置
     */
    getBaseConfig(){
        const projectName = this.PROJECTNAME;
        const env = this.ENV;
        let config = {};
        if(projectName && env){
            config.entry = path.resolve(__dirname, `../projects/${projectName}/index.js`); //统一的项目路口
            config.outDir = path.resolve(__dirname, `../dist/${projectName}-H5`); //输出测试包路径
            config.alias = Object.assign({}, this.getProjectAlias(projectName), this.getCommonAlias()); //项目文件映射
            config.publicPath = '/'; //静态资源路径
            config.templatePath = path.resolve(__dirname, `../projects/${projectName}/index.html`); //单页面html路径
            config.staticPath = path.resolve(__dirname, `../projects/${projectName}/assets/static`); //纯复制迁移的静态文件夹路径
            switch(projectName){
                case 'demo':
                    // 各项目需要配置的特性化属性，比如描述，主题色，区号等
                    config.primaryDesc = '这是demo项目的简介';
                    config.primaryColor = '#ccc';
                    switch(env){
                        case 'start':
                            config.baseUrl = 'http://139.224.227.52';   // 开发环境
                            break;
                        case 'mock':
                            config.baseUrl = 'http://localhost:8087';   // mock环境
                            break;
                        case 'test':
                            config.baseUrl = 'http://139.224.227.52';   // 测试环境
                            break;
                        case 'prod':
                            config.baseUrl = 'http://139.224.227.52';   // 生产环境
                            break;
                    }
                    break;
            }
        }else{
            console.error('项目名称无效');
        }
        return config;
    }
    /**
     * 获取全局数据配置
     */
    getGlobalData() {
        const config = this.getBaseConfig();
        return {
            BASE_URL : JSON.stringify(config.baseUrl),
            PUBLIC_PATH : JSON.stringify(config.publicPath),
            PRIMARY_COLOR : JSON.stringify(config.primaryDesc),
            PRIMARY_DESC : JSON.stringify(config.primaryColor)
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