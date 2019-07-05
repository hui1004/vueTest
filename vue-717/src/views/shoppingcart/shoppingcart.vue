<template>
    <div class="cart">
        <div class="cart-header">
            <span class="icon iconfont icon-back" @click="go_back"></span>
            <span>购物车</span>
            <span>
                <span @click="edit=!edit">{{if_item ? edit ? '编辑' : '完成' : ''}}</span>
                <i class="icon iconfont icon-message"></i>
            </span>
        </div>
        <div class="cart-wraper" v-if="if_item">
            <!-- <cart-item v-for="(item,i) in cart_list" :key="i" :item="item" :checkedAll="checked_all"></cart-item> -->
            <dl class="cart-item" v-for="(item,i) in cart_list" :key="i">
                <dt>
                    <span :class="{'check':item.checked}" @click="selected(item)"></span>
                    <div><img :src="'http://www.lb717.com'+item.src" alt=""></div>
                </dt>
                <dd>
                    <p class="item-title">{{item.name}}</p>
                    <div class="price-count">
                        <div class="price-left">
                            <p>x {{item.count}}</p>
                            <p>￥{{item.price}}</p>
                        </div>
                        <div class="count-right">
                            <span class="minus" @click="changeCount(item,-1)">-</span>
                            <!-- <span class="count">{{count}}</span> -->
                            <input type="text" value="1" class="count" disabled v-model="item.count">
                            <span class="plus" @click="changeCount(item,1)">+</span>
                        </div>
                    </div>
                </dd>
            </dl>
            <div class="cart-limit">到底了噢！</div>
            <div class="cart-footer">
                <div class="select-all">
                    <span :class="{'check':checked_all}" @click="selected_all"></span>
                    <span>全选</span>
                </div>
                <div class="total-price">
                    <div class="sum">
                        <p>合计：
                            <span>{{total_price | filter_money('元')}}</span>
                        </p>
                        <p>(运费：￥10.00)</p>
                    </div>
                    <div class="sumBtn" @click="del_item">{{edit ? '结算' : '删除'}}</div>
                </div>
            </div>
        </div>
        <div class="cart-empty" v-else>
            <div class="go-shopping">
                <div>
                    <i class="icon iconfont icon-cart"></i>
                </div>
                <p>购物车为空</p>
                <p @click="go_shopping">去逛逛</p>
            </div>
            <!-- <hotRecommend></hotRecommend> -->
        </div>
        <tips :active="isActive" :desc="desc"></tips>
    </div>
</template>
<script>
// import hotRecommend from '../../components/recommend/recommend.vue';
import tips from '../../components/tips/tips.vue';
import { mapState } from 'vuex';
import axios from 'axios';
import store from '../../store/store.js';

export default {
    data() {
        return {
            if_item: false,
            checked_all: false,
            total_price: 0,
            edit: true,
            isActive: false,
            desc: ''
        }
    },
    computed: {
        ...mapState(['cart_list']),// 映射 获取vuex数据
    },
    beforeRouteEnter(to, from, next) {
        let token = document.cookie.split("=")[1];
        if (token) {
            axios.post('/cart/list', { token: token }).then((res) => {
                store.commit('updateCartlist', res.data);
                next();
            })
        } else{
            next();
        }
    },
    /* created() { //?
        let token = document.cookie.split("=")[1];
        console.log(token,this.cart_list);
        if (token) {
            this.$http.post('/cart/list', { token: token }).then((res) => {
                this.$store.commit('updateCartlist', res.data);
            })
        }

    }, */
    mounted() {
        if (this.cart_list.length > 0) {
            this.if_item = true; // 数组不为空显示选购的商品 否则显示空购物车页面
        }
    },
    watch: {
        'cart_list': function(n, o) {
            if (n.length == 0) {
                this.if_item = false; // 删除完没有商品之后 显示空的购物车页面
            }
        }
    },
    methods: {
        selected_all() { // 全选
            this.checked_all = !this.checked_all;
            this.cart_list.forEach((item, ind) => {
                if (this.checked_all) {
                    if (typeof item.checked == "undefined") {
                        this.$set(item, "checked", true);
                    } else {
                        item.checked = true;
                    }
                } else {
                    item.checked = false;
                }

            })
            this.sum();
        },
        changeCount(product, way) { // 增减数量
            if (way > 0) {
                product.count++;
            } else {
                product.count--;
                if (product.count < 1) {
                    product.count = 1;
                }
            }
            this.sum();
        },
        selected(item) { // 单选
            if (typeof item.checked == 'undefined') {
                // Vue.set(item, "checked", true); // 在数据里全局注册变量
                this.$set(item, "checked", true); // 局部注册
            } else {
                item.checked = !item.checked;
            }
            let flag = true;
            this.cart_list.forEach((val, index) => {
                if (!val.checked) {
                    flag = false;
                }
            })
            this.checked_all = flag;
            this.sum();
        },
        sum() { // 求和
            this.total_price = 0;
            this.cart_list.forEach(item => {
                if (item.checked) {
                    this.total_price += item.price * item.count;
                }
            })
        },
        go_back() { // 返回上一页面
            this.$router.go(-1);
        },
        del_item() { // 编辑状态下删除选中项
            if (!this.edit) {
                let if_checked = false, checked_id = [];
                this.cart_list.forEach((item, index) => {
                    console.log(item);
                    if (item.checked) {
                        if_checked = true;
                        checked_id.push(item.id);
                    }
                })
                if (!if_checked) {
                    this.desc = '您还没有选中任何商品';
                    this.isActive = true;
                    setTimeout(() => {
                        this.isActive = false;
                    }, 1500)
                } else {
                    this.$store.commit('delItem', checked_id);
                    this.total_price = 0; // 删除完之后价格归零
                    this.checked_all = false; // 删除完之后显示空的购物车页面
                }

            }
        },
        go_shopping() {
            this.$router.push({ name: 'home' });
        }
    },
    filters: {
        filter_money: function(val, type) {
            return "￥" + val.toFixed(2) + type;
        }
    },
    components: {
        // hotRecommend,
        'tips': tips
    }
}
</script>
<style lang="scss" scoped>
@mixin paddingLR($left:.3rem, $right:.3rem) {
    padding-left: $left;
    padding-right: $right;
    box-sizing: border-box;
}

.cart {
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    -webkit-flex-direction: column;
    background-color: #eeeeee;
}

.cart-header {
    line-height: 0.9rem;
    padding-top: .3rem;
    box-sizing: border-box;
    @include paddingLR;
    position: relative;
    background-color: #fafafb;
    border-bottom: .01rem solid #ccc;
    text-align: center;
    &>span {
        font-size: .33rem;
        &:first-child {
            position: absolute;
            top: .3rem;
            left: .3rem;
        }
        &:last-child {
            position: absolute;
            top: .3rem;
            right: .3rem;
        }
    }
}

.cart-wraper {
    -webkit-flex: 1;
    overflow-y: scroll;
    margin-bottom: .9rem;
}

.cart-item {
    height: 2.64rem;
    margin-bottom: .2rem;
    display: -webkit-flex;
    align-items: center;
    @include paddingLR(.2rem, .3rem);
    background-color: #fff;
    dt {
        display: -webkit-flex;
        align-items: center;
        margin-right: .2rem;
        &>span {
            display: inline-block;
            width: 0.44rem;
            height: 0.44rem;
            line-height: 0.44rem;
            text-align: center;
            font-size: .24rem;
            border-radius: 50%;
            border: .01rem solid #ccc;
            margin-right: .1rem;
        }
        &>div {
            width: 2.02rem;
            height: 2.02rem;
            border: .01rem solid #ccc;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    dd {
        -webkit-flex: 1;
        height: 2.02rem;
        .item-title {
            font-size: .26rem;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
        .price-count {
            margin-top: .5rem;
            display: -webkit-flex;
            justify-content: space-between;
            .price-left {
                p:first-child {
                    font-size: .24rem;
                    color: #666;
                    position: relative;
                    left: .06rem;
                    margin-bottom: .1rem;
                }
                p:last-child {
                    font-size: .24rem;
                    color: #fc4141;
                }
            }
            .count-right {
                .minus,
                .plus {
                    display: inline-block;
                    width: 0.56rem;
                    line-height: 0.6rem;
                    text-align: center;
                    font-size: .36rem;
                    border: .01rem solid #ccc;
                }
                .minus {
                    border-top-left-radius: .04rem;
                    border-bottom-left-radius: .04rem;
                }
                .plus {
                    border-top-right-radius: .04rem;
                    border-bottom-right-radius: .04rem;
                }
                .count {
                    display: inline-block;
                    width: 0.98rem;
                    line-height: 0.6rem;
                    text-align: center;
                    font-size: .36rem;
                    border-width: 0;
                    border-top: .01rem solid #ccc;
                    border-bottom: .01rem solid #ccc;
                    background-color: #fff;
                }
            }
        }
    }
}

.cart-limit {
    width: 100%;
    line-height: .6rem;
    font-size: .28rem;
    text-align: center;
}

.cart-empty {
    .go-shopping {
        height: 6.2rem;
        margin-bottom: .2rem;
        background-color: #fff;
        display: -webkit-flex;
        -webkit-flex-direction: column;
        justify-content: center;
        align-items: center;
        &>div {
            width: 1.34rem;
            height: 1.34rem;
            line-height: 1.34rem;
            text-align: center;
            border: .01rem solid #ccc;
            border-radius: 50%;
            i {
                font-size: .6rem;
            }
        }
        &>p {
            &:nth-child(2) {
                line-height: .9rem;
                font-size: .3rem;
            }
            &:last-child {
                width: 1.62rem;
                line-height: 0.68rem;
                text-align: center;
                color: #fc4141;
                font-size: .32rem;
                border: .01rem solid #fc4141;
                border-radius: .06rem;
            }
        }
    }
}

.cart-footer {
    width: 100%;
    height: 0.9rem;
    background-color: #fff;
    border-top: .01rem solid #ccc;
    border-bottom: .01rem solid #ccc;
    position: fixed;
    bottom: .98rem;
    left: 0;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    .select-all {
        padding-left: .2rem;
        box-sizing: border-box;
        display: -webkit-flex;
        align-items: center;
        span:first-child {
            display: inline-block;
            width: 0.44rem;
            height: 0.44rem;
            line-height: 0.44rem;
            text-align: center;
            font-size: .24rem;
            border-radius: 50%;
            border: .01rem solid #ccc;
            margin-right: .1rem;
        }
        span:last-child {
            font-size: .28rem;
        }
    }
    .total-price {
        display: -webkit-flex;
        align-items: center;
        .sum {
            margin-right: .26rem;
            -webkit-flex: 1;
            p:first-child {
                font-size: .28rem;
                color: #333;
                span {
                    color: #fc4141;
                }
            }
            p:last-child {
                font-size: .24rem;
            }
        }
        .sumBtn {
            width: 2.54rem;
            line-height: .9rem;
            text-align: center;
            background-color: #fc4141;
            color: #fff;
            font-size: .32rem;
        }
    }
}

.check {
    border-width: 0;
    background-color: #fc4141;
    &:after {
        content: '✔';
        color: #fff;
    }
}
</style>
