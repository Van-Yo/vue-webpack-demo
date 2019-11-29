/**
 * module API set
 */
class Api{
    constructor(){}
    // 获取基本url
    baseUrlJudge(){
        let baseUrl = '';
        switch(ENV){
            case 'start':
                baseUrl = 'http://139.224.227.52/api';
                break;
            case 'mock':
                baseUrl = 'http://localhost:8081';
                break;
            case 'prod':
                baseUrl = '';
                break;
            default:
                baseUrl = '';
                break;
        }
        return baseUrl;
    }
    apiList(){
        let config = {};
        let baseUrl = this.baseUrlJudge();
        config.weatherSearchApi = `${baseUrl}/book/findBook`;   // 天气查询
        return config;
    }
}
export default new Api();