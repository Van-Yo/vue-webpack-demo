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
(function () {
    // window.onresize监听屏幕的改变从而改变默认字体大小
    var countRem = function () {
        var documentElement = document.documentElement;
        var width = documentElement.clientWidth;
        documentElement.style.fontSize = 100 * (width / 360) + 'px';
    };
    countRem();
    window.onresize = countRem;
})();