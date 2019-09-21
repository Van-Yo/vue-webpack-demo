import Vue from 'vue';
import app from './App.vue';
import router from './router/index';
new Vue({
    el: '#app',
    router,
    render: c => c(app),
});