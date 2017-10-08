<template>
    <dl class="product-item" @click="go_to_details">
        <dt><img :src="'http://www.lb717.com'+goods['obj_data']" alt=""></dt>
        <dd>
            <p class="product-name">{{goods.goods_name}}</p>
            <p class="product-price">
                <span>￥{{goods.discount_price}}</span>
                <span class="icon iconfont icon-cart" @click.stop="add_to_cart"></span>
            </p>
        </dd>
    </dl>
</template>
<script>
export default {
    props: ['goods'],
    methods: {
        add_to_cart() {
            let token = document.cookie.split('=')[1];
            console.log(token);
            if (token) {
                this.$http.post('/user/cart/addCart', {
                    goods_desc: {
                        id: this.goods.goods_id,
                        price: this.goods.discount_price,
                        name: this.goods.goods_name,
                        src: this.goods.obj_data,
                        count: 1
                    },
                    token: token
                })
                    .then(res => {
                        if (res.data == 1) {
                            let data = {
                                id: this.goods.goods_id,
                                price: this.goods.discount_price,
                                name: this.goods.goods_name,
                                src: this.goods.obj_data,
                                count: 1
                            }
                            this.$store.commit('add_cart', data);
                            this.$emit('show-mark', {bool:true,desc:'添加购物车成功'});
                        }
                    })
            } else {
                this.$emit('show-mark', {bool:true,desc:'请先登录'});
            }

        },
        go_to_details() {
            this.$router.push('/details');
        }
    }
}
</script>
<style lang="sass" scoped>
@mixin paddingLR($left:.3rem,$right:.3rem)
    padding-left: $left 
    padding-right: $right 
    box-sizing: border-box
.product-item   
    width: 49%
    background-color: #fff
    margin-bottom: .1rem
    &:nth-child(2n+1)
        margin-right: .07rem
    &:nth-child(2n)
        margin-left: .07rem
    dt 
        height: 3.68rem
        img
            width: 100%  
            height: 100%
    dd 
        @include paddingLR(.1rem,.1rem)
        margin-top: .1rem
        .product-name
            font-size: .28rem 
            height: .8rem
            display: -webkit-box
            -webkit-box-pack: center
            overflow: hidden
            text-overflow: ellipsis
            -webkit-box-orient: vertical
            -webkit-line-clamp: 2
        .product-price
            line-height: .56rem 
            display: -webkit-flex
            justify-content: space-between
            span 
                font-size: .3rem
                &:first-child
                    color: #fc4141 
</style>


