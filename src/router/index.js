import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import memberModule from '@router/modules/member';
let baseArr = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */'@pages/Home.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/error-page',
        component: () => import(/* webpackChunkName: "Error" */'@pages/ErrorPage.vue'),
        meta: {
            title: '缺省页'
        }
    },
];
const errorList = [{
    path: '*',
    redirect: '/error-page'
}];
let routes = [
    ...memberModule,
    ...baseArr,
    ...errorList,
];
const index = new VueRouter({
    mode: 'history',
    routes
});
//路由钩子
index.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
export default index;