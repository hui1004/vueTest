// 引入common style
// import './css/swiper.min.css';
// import './font/iconfont.css';
// import './css/reset.css';
// import './css/common.css';
// import './js/fontReset.js';
// import './js/swiper.min.js';

import Vue from 'vue';
import App from './App.vue';
import router from './route/route'; // 注入路由
import axios from 'axios';
import store from './store/store'; // 注入Vuex
import '../mock/mock.js';
import './plugins/dialog/awesomeDialog'

Vue.prototype.$http = axios;

var transformer = new Vue({});

new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App)
})
