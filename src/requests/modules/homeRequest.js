import http from '@utils/http.js';
import api from '@requests/api.js';
/**
 * home module request
*/
class HomeRequest{
    constructor(){
        this.config = api.apiList();
    }
    weatherSearch(params){
        return http.get(this.config.weatherSearchApi,params);
    }
}
export default new HomeRequest();