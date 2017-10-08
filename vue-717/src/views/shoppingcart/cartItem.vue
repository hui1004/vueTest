<template>
    <dl class="cart-item">
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
</template>
<script>
import Vue from 'vue';
import {mapState} from 'vuex';
export default {
    props: ['item', 'checkedAll'],
    data() {
        return {
            // count: 1,
            // check: false
        }
    },
    created() {
        // this.count = this.item.count;
    },
    computed:{
        ...mapState(['cart_list'])
    },
    methods: {
        /* minus() {
            this.count = this.count-- < 1 ? 1 : this.count--;
            this.sum();
        },
        plus() {
            this.count++;
            this.sum();
        }, */
        changeCount: function(product, way) { // 增减数量
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
            if(typeof item.checked == 'undefined'){
                Vue.set(item,"checked",true); // 在数据里全局注册变量
                // this.$set(item,"checked",true); // 局部注册
                this.cart_list.forEach((val,index)=>{
                    console.log(val);
                    if(val.checked == false){
                        this.checkedAll = false;
                        console.log(2);
                    }
                })
            }else{
                item.checked = !item.checked;
            }
            this.sum();
        },
        sum() { // 求和
            if (this.item.checked) {
                this.$store.commit('oncountchange', {
                    name: this.item.name,
                    price: this.item.price * this.item.count
                })
            } else {
                this.$store.commit('oncountchange', {
                    name: this.item.name,
                    price: 0
                })
            }
        }
    },
    watch: {
        /* check: function(n, o) { // 监听选中项变化 更改价格
            this.sum();
        }*/
    }
}
</script>
<style lang="scss" scoped>
@mixin paddingLR($left:.3rem, $right:.3rem) {
    padding-left: $left;
    padding-right: $right;
    box-sizing: border-box;
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

.check {
    border-width: 0;
    background-color: #fc4141;
    &:after {
        content: '✔';
        color: #fff;
    }
}
</style>


