<template>
    <div class="wrap-content">
        <ul class="home-header">
            <li>
                <img src="../../imgs/logo.jpg" alt="">
            </li>
            <li>
                <input type="text" placeholder="请输入您要购买的商品" @focus="go_to_search">
                <i class="icon iconfont icon-search"></i>
            </li>
            <li>
                <i class="icon iconfont icon-shop"></i>
                <span>我的店铺</span>
            </li>
            <li>
                <i class="icon iconfont icon-shop"></i>
                <span>消息</span>
            </li>
        </ul>
        <div class="content-container" ref="container" @scroll="load_goods">
            <div class="main">
                <div class="home-banner">
                    <div class="swiper-container swiper-banner">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <img src="../../imgs/ban.jpg" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="../../imgs/banner1.png" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="../../imgs/banner2.png" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="../../imgs/banner3.png" alt="">
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
                <div class="navigator">
                    <ul>
                        <li>
                            <i class="icon iconfont icon-shop"></i>
                            <span>家乡味道</span>
                        </li>
                        <li>
                            <i class="icon iconfont icon-shop"></i>
                            <span>进口食品</span>
                        </li>
                        <li>
                            <i class="icon iconfont icon-shop"></i>
                            <span>牛奶乳品</span>
                        </li>
                        <li>
                            <i class="icon iconfont icon-shop"></i>
                            <span>茶果冲饮</span>
                        </li>
                        <li>
                            <i class="icon iconfont icon-shop"></i>
                            <span>休闲零食</span>
                        </li>
                        <li>
                            <i class="icon iconfont icon-shop"></i>
                            <span>米面粮油</span>
                        </li>
                        <li>
                            <i class="icon iconfont icon-shop"></i>
                            <span>调味调料</span>
                        </li>
                        <li>
                            <i class="icon iconfont icon-shop"></i>
                            <span>酒水饮料</span>
                        </li>
                    </ul>
                </div>
                <div class="trends">
                    <p class="trends-title">商城动态</p>
                    <div class="swiper-container trends-content">
                        <div class="swiper-wrapper trends-wrapper">
                            <div class="swiper-slide trends-slide">
                                绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心，健康第一，安全保证，确保蔬菜新鲜
                            </div>
                            <div class="swiper-slide trends-slide">
                                绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心，健康第一，安全保证，确保蔬菜新鲜
                            </div>
                            <div class="swiper-slide trends-slide">
                                绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心，健康第一，安全保证，确保蔬菜新鲜
                            </div>
                        </div>
                    </div>
                </div>
                <div class="on-sale">
                    <div class="on-sale-title">
                        <i class="icon iconfont icon-shop"></i>
                        <h3>天天特惠
                            <span>每天都有惊喜</span>
                        </h3>
                    </div>
                    <div class="on-sale-more">
                        <span>更多 ></span>
                    </div>
                </div>
                <div class="product-list">
                    <div class="product-left">
                        <img src="../../imgs/product/product_03.jpg" alt="">
                    </div>
                    <div class="product-right">
                        <div class="product-top">
                            <img src="../../imgs/product/product_05.jpg" alt="">
                        </div>
                        <div class="product-bottom">
                            <img src="../../imgs/product/product_08.jpg" alt="">
                        </div>
                    </div>
                </div>
                <div class="hometown">
                    <p>
                        <i class="icon iconfont icon-shop"></i>
                        <span>家乡味道</span>
                    </p>
                    <span>更多 ></span>
                </div>
                <div class="product-details">
                    <goods v-for="(item,index) in goods_channel" :key="index" :goods="item" @show-mark="show_masker"></goods> 
                    <p class="loading" v-if="!can_request">{{info}}</p>  
                </div>
            </div>
        </div>
        <tips :active="isActive" :desc="desc"></tips>   
    </div>
</template>
<script>
import goods from '../../components/goods/goods.vue';
import tips from '../../components/tips/tips.vue';

export default {
    data(){
        return {
            goods_channel:[],
            can_request:true,
            goods_id:0,
            info:'正在加载...',
            isActive: false,
            desc:''
        }
    },
    created(){
        this.get_goods(0)
    },
    mounted() {
        new Swiper('.swiper-banner', {
            pagination: '.swiper-pagination',
            autoplay: 2000,
            loop: true
        }),
        new Swiper('.trends-content',{
             direction: 'vertical',
             autoplay: 2000,
             loop: true
        })
    },
    methods:{
        show_masker(obj){ // 添加购物车出现弹出层
            this.isActive = obj.bool;
            this.desc = obj.desc;
            setTimeout( ()=> {
              this.isActive = !obj.bool;  
            }, 1000);
        },
        go_to_search(){
            this.$router.push('/search');
        },
        get_goods(id){ //  发起网络请求,请求刷新数据
            this.$http.get('/mall/index/getGoodsChannel',{
                channel_id:id
            }).then((res)=>{
                // console.log(res.data[id].data.data);
                this.goods_channel = [...this.goods_channel,...res.data[id].data.data];
                this.can_request = true;
                // console.log(this.goods_channel);
            })
        },
        load_goods(){ // 上拉加载数据
            let container = this.$refs.container;
            let max_height = container.querySelector('.main').offsetHeight - container.offsetHeight;
            let scrollTop = container.scrollTop;
            if(max_height-scrollTop<10){
                if(this.can_request){
                    this.can_request = false;
                    this.goods_id++;
                    if(this.goods_id>=8){
                        this.info = '我是有底线的~';
                        return;
                    };
                    this.get_goods(this.goods_id)
                }
            } 
        }
    },
    components:{
        goods,
        tips
    }
}
</script>
<style lang="sass" scoped>
@mixin paddingLR($left:.3rem,$right:.3rem)
    padding-left: $left 
    padding-right: $right 
    box-sizing: border-box
.wrap-content   
    background-color: #f6f5f5
    display: -webkit-flex
    -webkit-flex-direction: column
.home-header
    display: -webkit-flex
    padding-left: .3rem 
    box-sizing: border-box

    background-color: #fff
    li 
        height: .98rem
        display: -webkit-flex
        justify-content: center
        align-items: center
        -webkit-flex-direction: column
        color: #fc4141
        &:first-child
            @include paddingLR(.1rem,.1rem)
            padding-top: .3rem 
            padding-bottom: .2rem 
            box-sizing: border-box
            -webkit-flex: 2
            img 
                width: 100%
                height: 100% 
        &:nth-child(2)
            position: relative 
            -webkit-flex: 5
            box-sizing: border-box
            input  
                width: 100% 
                height: .6rem
                background-color: #f5f5f5
                border-radius: .05rem
                border-width: 0
                text-indent: .7rem
                font-size: .2rem
            i 
                position: absolute
                left: .3rem 
                top: .3rem
                color: #999999
        &:nth-child(3),
        &:nth-child(4)
            -webkit-flex: 1


.content-container
    -webkit-flex: 1
    overflow-y: scroll
.home-banner
    height: 3.54rem
    img 
        width: 100%
        height: 100%

.navigator
    margin-top: .1rem
    background-color: #fff
    ul 
        display: -webkit-flex
        -webkit-flex-wrap: wrap
        padding-top: .14rem 
        box-sizing: border-box
        li 
            width: 25% 
            display: -webkit-flex
            justify-content: center
            align-items: center
            -webkit-flex-direction: column
            margin-bottom: .27rem
            &:nth-child(2)
                i 
                    background-color:#ad56f1
            &:nth-child(3)
                i 
                    background-color:#ffde00
            &:nth-child(4)
                i 
                    background-color:#70bf00
            &:nth-child(5)
                i 
                    background-color:#f65c38
            &:nth-child(6)
                i 
                    background-color:#ffc62c
            &:nth-child(7)
                i 
                    background-color:#ffb139
            &:nth-child(8)
                i 
                    background-color:#6962fc 
            i 
                width: .88rem
                line-height: .88rem
                border-radius: 50% 
                text-align: center
                background-color: #f8c986
                color: #fff
            span 
                font-size: .24rem
                padding-top: .14rem
.trends
    height: .9rem 
    background-color: #fff
    display: -webkit-flex
    align-items: center
    @include paddingLR
    .trends-title   
         color: #ff6d00
         width: .6rem 
         margin-right: .1rem
    .trends-content
        border: .01rem solid #ccc
        border-radius: .04rem 
        font-size: .24rem 
        line-height: .37rem 
        height: .8rem
        // padding-bottom: .02rem
        @include paddingLR(.1rem,.1rem)
        .trends-slide
            width: 100%
            height: 100%

.on-sale    
    margin-top: .1rem 
    margin-bottom: .1rem 
    height: .8rem
    background-color: #fff
    display: -webkit-flex
    justify-content: space-between
    @include paddingLR
    & > div     
        color: #ff6d00 
    & > .on-sale-title
        display: -webkit-flex
        align-items: center
        i  
            width: .4rem 
            height: .4rem
            line-height: .4rem 
            font-size: .24rem
            text-align: center
            border: .01rem solid #ff6d00 
            border-radius: 50% 
            margin-right: .1rem
        h3 
            font-size: .3rem
            span 
                font-size: .22rem
                font-weight: 400
    & > .on-sale-more   
        line-height: .8rem
        font-size: .22rem

.product-list
    display: -webkit-flex
    .product-left,
    .product-right  
        -webkit-flex: 1
        img
            width: 100%
            height: 100%
    .product-right
        margin-left: .1rem
        .product-top
            margin-bottom: .1rem
.hometown
    background-color: #fff 
    position: relative
    margin-top: .2rem 
    margin-bottom: .1rem
    & > p 
        width: 100% 
        line-height: 1rem 
        text-align: center
        color: #f5803f
        font-size: .3rem
        i 
            display: inline-block
            width: .4rem 
            line-height: .4rem
            text-align: center
            border: .01rem solid #f5803f
            border-radius: 50%
            font-size: .24rem
    & > span 
        position: absolute
        right: .3rem 
        top: .38rem
        font-size: .2rem
.product-details
    display: -webkit-flex
    -webkit-flex-wrap: wrap
    .loading
        width: 100%
        font-size: .24rem
        line-height: .6rem
        text-align: center
        

</style>

