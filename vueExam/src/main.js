import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router'; // 路由
import store from './store/index'; // vuex

Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  store:store,
  beforeCreate:function(){
    this.$http.get('./src/service/question.json').then((res)=>{
      this.$store.dispatch('get_question',res.data);
    })
  },
  router:router,
  render: h => h(App)
})
