<template>
    <div class="container">
        <router-view class="wrap"></router-view>

        <div class="footer">
            <ul>
                <router-link :to="{name:'home'}" tag="li">
                    <span class="icon iconfont icon-home"></span>
                    <span>首页</span>
                </router-link>

                <router-link :to="{name:'catagory',params:{index:0}}" tag="li">
                    <span class="icon iconfont icon-apps"></span>
                    <span>分类</span>
                </router-link>

                <router-link :to="{name:'shoppingcart'}" tag="li">
                    <span class="icon iconfont icon-cart"></span>
                    <span>购物车</span>
                </router-link>

                <router-link :to="{name:'user'}" tag="li">
                    <span class="icon iconfont icon-people"></span>
                    <span>我的</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="sass">
    .container
        width: 100%
        height: 100%
        display: -webkit-flex
        -webkit-flex-direction: column
    .wrap
        -webkit-flex: 1
    .footer 
        background-color: #fff
        ul
            display: -webkit-flex
            li 
                width: 33.3%
                height: .98rem
                display: -webkit-flex
                justify-content: center
                align-items: center
                -webkit-flex-direction: column
                span 
                    &:first-child
                        font-size: .39rem 
                    &:last-child    
                        font-size: .27rem
    .router-link-active
        color: #fc4141
                


</style>


