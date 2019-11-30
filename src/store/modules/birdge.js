import storage from '@utils/storage'
/**
 * 桥数据关联
 * 更新本地数据，将vuex里面的数据同步到本地数据中
 * 作用：数据同步到本地，以后页面刷新就能从本地拿数据了，防止vuex数据丢失
*/
let bridgeVuexToStorage = (vuexObj) => {
    let storageBirdgeObj = storage.getBridgeData();
    let vuexBirdgeObj = Object.assign(storageBirdgeObj,vuexObj);
    storage.setBridgeData(vuexBirdgeObj);
}

const type = {
    SET_PAYSTATUS : 'SET_PAYSTATUS',      //【存数据】支付状态
    GET_PAYSTATUS : 'GET_PAYSTATUS',      //【取数据】支付状态
    SET_CARTLIST : 'SET_CARTLIST',     //【存数据】购物车列表
    GET_CARTLIST : 'GET_CARTLIST',      //【取数据】购物车列表
};

const state = {
    payStatus:'1',
    cartList:[
        {name:'水浒传',price:18,num:2},
        {name:'西游记',price:23,num:1}
    ]
};

const getters = {
    [type.GET_PAYSTATUS](state){
        return state.payStatus;
    },
    [type.GET_CARTLIST](state){
        return state.cartList;
    },
};

const actions = {

};

const mutations = {
    [type.SET_PAYSTATUS](state,status){
        state.payStatus = status;
        bridgeVuexToStorage(state);
    },
    [type.SET_CARTLIST](state,books){
        state.cartList.push(books);
        bridgeVuexToStorage(state);
    }
};

export default {
    namespaced : true,
    state,
    getters,
    actions,
    mutations
};