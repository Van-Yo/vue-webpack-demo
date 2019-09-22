/**
 * 本地存储
 */
class Storage {
    constructor() {
        this.header = 'header';
        this.memberInfo = 'memberInfo';
    }
    /**
     * set session storage model
     */
    setSessionStorage(value) {
        sessionStorage.setItem(this.header, JSON.stringify(value));
    }
    /**
     * get session storage model
     */
    getSessionStorage(){
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
}
export default new Storage();