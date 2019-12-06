import http from '@utils/http.js';
import api from '@requests/api.js';
/**
 * home module request
*/
class HomeRequest{
    constructor(){
        this.apiList = api.getApiList();
    }
    // ****************************** 书籍request模块 ******************************
    /**
     * 书籍查询
    */
    findBooksRequest(params){
        return http.get(this.apiList.findBookApi,params);
    }
}
export default new HomeRequest();