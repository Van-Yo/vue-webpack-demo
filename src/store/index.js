import Vue from 'vue';
import Vuex from 'vuex';

//store文件自动配置，不需要手动引用
const requireContext = require.context('./modules/', false, /\.js$/);
let storeModules = {};
requireContext.keys().forEach(fileName => {
    const name = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
    let list = requireContext(fileName).default;
    storeModules[name] = list;
});
Vue.use(Vuex);

export default new Vuex.Store({
    modules:storeModules
});