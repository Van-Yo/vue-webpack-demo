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
                baseUrl = 'https://www.apiopen.top/';
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
        config.weatherSearchApi = `${baseUrl}/weatherApi`;   // 天气查询
        return config;
    }
}
export default new Api();