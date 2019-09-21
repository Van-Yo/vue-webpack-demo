import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
let baseArr = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */'../pages/Home.vue'),
        meta: {
            title: '首页'
        }
    },
];
let routes = [
    ...baseArr,
];
const index = new VueRouter({
    mode: 'history',
    routes
});
export default index;