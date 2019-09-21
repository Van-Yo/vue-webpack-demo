import Vue from 'vue';
import app from './App.vue';
import router from './router/index';
import './assets/css/public.scss';
import './assets/css/reset.css';
new Vue({
    el: '#app',
    router,
    render: c => c(app),
});