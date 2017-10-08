import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        cart_list: [],
        total_price:0,
        money:{},
        desc:'',
        active:false
    },
    mutations: {
        add_cart(state, data) {
            let no_repeat = false; // 避免同一类目渲染多次 只数量增加
            let len = state.cart_list.length;
            for (let i = 0; i < len; i++) {
                if (state.cart_list[i].id == data.id) {
                    state.cart_list[i].count++;
                    no_repeat = true;
                }
            }
            if (!no_repeat) {
                state.cart_list.unshift(data);
            }
        },
        delItem(state,idArr){ // 购物车删除数据
            let temp = [],tempArr = [];
            for(let i=0;i<idArr.length;i++){
                temp[idArr[i]] = true;
            }
            for(let i=0;i<state.cart_list.length;i++){
                if(!temp[state.cart_list[i].id]){
                    tempArr.push(state.cart_list[i]);
                }
            }
            state.cart_list = tempArr;
        },
        updateCartlist(state,list){
            state.cart_list = [...list];
            console.log(state.cart_list);
        },
        show_tips(state,obj){
            state.desc = obj.msg;
            state.active = obj.flag;
            setTimeout(function(){
                state.active = false;
            },1000)
        }
        /* oncountchange(state,data){ // 选中商品总价
            let price = 0;
            state.money[data.name] = data.price;
            Object.values(state.money).forEach(val=>{
                price += val
            })
            state.total_price = price.toFixed(2);
        } */
    }
})

export default store;