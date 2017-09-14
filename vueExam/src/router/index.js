import Vue from 'vue';
import VueRouter from 'vue-router';
import question from '../views/question/index.vue';
import home from '../views/home/index.vue';
import result from '../views/result/index.vue';
Vue.use(VueRouter);

const routes = [
    {
      path:'/',
      redirect:'/home'
    },
    {
      name:'home',
      path:'/home',
      component:home
    },
    {
      name:'question',
      path:'/question/:step',
      component:question
    },
    {
      name:'result',
      path:'/result',
      component:result
    }
  ];
  
let router = new VueRouter({
    routes:routes
})

export default router