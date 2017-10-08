import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index/index.vue';
import home from '../views/home/home.vue';
import catagory from '../views/catagory/catagory.vue';
import shoppingcart from '../views/shoppingcart/shoppingcart.vue';
import user from '../views/user/user.vue';
import search from '../views/search/search.vue';
import result from '../views/result/result.vue';
import details from '../views/details/details.vue';
import login from '../views/login/login.vue';
import bindPhone from '../views/bindPhone/bindPhone.vue';
import address from '../views/address/address.vue';
import addAddress from '../views/addAddress/addAddress.vue';
import loginout from '../views/loginout/loginout.vue';

Vue.use(VueRouter);

let routes = [
    {
        path: '/',
        redirect: { name: 'index' }
    },
    {
        name: 'index',
        path: '/index',
        component: index,
        redirect: { name: 'home' },
        children: [
            {
                name: 'home',
                path: 'home',
                component: home
            },
            {
                name: 'catagory',
                path: 'catagory/:index?',
                component: catagory
            },
            {
                name: 'shoppingcart',
                path: 'shoppingcart',
                component: shoppingcart
            },
            {
                name: 'user',
                path: 'user',
                component: user
            },
            {
                name: 'result',
                path: 'result',
                component: result
            }
        ]
    },
    {
        name: 'search',
        path: '/search',
        component: search
    },
    {
        name: "details",
        path: '/details',
        component: details
    },
    {
        name: 'login',
        path: '/login',
        component: login
    },
    {
        name: 'bindPhone',
        path: '/bindPhone',
        component: bindPhone
    },
    {
        name:'address',
        path:'/address',
        component:address
    },
    {
        name:'addAddress',
        path:'/addAddress/:id?',
        component:addAddress
    },
    {
        name:'loginout',
        path:'/loginout',
        component:loginout
      }
]

let router = new VueRouter({
    routes: routes
})

router.beforeEach(function (to, from, next) {
    if (to.name == 'login') {
        next()
        return;
    }
    if (to.name == 'user') {
        let cookie_list = document.cookie.split(';');
        let tocken = null;
        for (let i = 0; i < cookie_list.length; i++) {
            if (cookie_list[i].indexOf('717-token') > -1) {
                tocken = cookie_list[i].split('=')[1]
            }
        }

        if (!tocken) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    } else {
        next()
    }


})


export default router