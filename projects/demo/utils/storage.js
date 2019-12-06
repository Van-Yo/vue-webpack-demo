/**
 * 本地存储
 */
class Storage {
    constructor() {
        this.header = 'header';
        this.memberInfo = 'memberInfo';
        this.bridge = 'bridge';     // 桥数据
    }
    /**
     * set session storage model
     */
    setRequestHeader(value) {
        sessionStorage.setItem(this.header, JSON.stringify(value));
    }
    /**
     * get session storage model
     */
    getRequestHeader(){
        return JSON.parse(sessionStorage.getItem(this.header) || '{}');
    }
    /**
     * set memberInfo session storage
     */
    setMemberInfo(value){
        sessionStorage.setItem(this.memberInfo,JSON.stringify(value));
    }
    /**
     * get memberInfo session storage
     */
    getMemberInfo(){
        return JSON.parse(sessionStorage.getItem(this.memberInfo) || '{}');
    }
    /**
     * set bridge session storage
     */
    setBridgeData(value) {
        sessionStorage.setItem(this.bridge, JSON.stringify(value));
    }
    /**
     * get bridge session storage
     */
    getBridgeData(){
        return JSON.parse(sessionStorage.getItem(this.bridge) || '{}');
    }
}
export default new Storage();