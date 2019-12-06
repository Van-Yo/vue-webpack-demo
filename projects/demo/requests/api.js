/**
 * module API set
 */
class Api{
    constructor(){
    }
    // 获取基本api
    getApiList(){
        let apiList = {};
        // ****************************** 书籍api模块 ******************************
        apiList.findBookApi = `${BASE_URL}/api/book/findBook`;   // 书籍查询
        
        return apiList;
    }
}
export default new Api();