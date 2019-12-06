const type = {
    SET_CARTList : 'SET_CARTList',      //【存数据】购物车列表
    GET_CARTLIST : 'GET_CARTLIST'       //【取数据】购物车列表

};

const state = {
    cartlist:[
        {name:'红楼梦'}
    ]
};

const getters = {
    [type.GET_CARTLIST](state){
        return state.cartlist;
    }
};

const actions = {
    addBookData({commit},books){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                commit(type.SET_CARTList,books);
                resolve('3秒后插入了数据');
            }, 3000);
        });
    }
};

const mutations = {
    [type.SET_CARTList](state,books){
        state.cartlist.push(...books);
    }
};

export default {
    namespaced : true,
    state,
    getters,
    actions,
    mutations
};