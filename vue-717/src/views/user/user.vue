<template>
    <div class="user">
        <div class="user-header">
            <span class="icon iconfont icon-settings" @click="loginout"></span>
            <span>我的717商城</span>
            <span class="icon iconfont icon-message"></span>
        </div>
        <div class="user-wraper">
            <div class="user-banner" @click="go_to_login">
                <img src="../../imgs/user/user-light.png" alt="">
                <span>路飞</span>
            </div>
            <div class="user-shop">
                <p>
                    <span class="icon iconfont icon-shop"></span>
                    <span>我的店铺</span>
                </p>
                <span>></span>
            </div>
            <div class="user-nav">
                <ul>
                    <li>
                        <span class="icon iconfont icon-refund"></span>
                        <span>待付款</span>
                    </li>
                    <li>
                        <span class="icon iconfont icon-refund"></span>
                        <span>待发货</span>
                    </li>
                    <li>
                        <span class="icon iconfont icon-refund"></span>
                        <span>待收货</span>
                    </li>
                    <li>
                        <span class="icon iconfont icon-refund"></span>
                        <span>售后</span>
                    </li>
                    <li>
                        <span class="icon iconfont icon-refund"></span>
                        <span>我的订单</span>
                    </li>
                </ul>
                <span>></span>
            </div>
            <div class="user-list">
                <ul>
                    <li>
                        <span class="icon iconfont icon-refund"></span>
                        <p>
                            <span>账户余额</span>
                            <span>></span>
                        </p>
                    </li>
                    <li @click="go_to_address">
                        <span class="icon iconfont icon-refund"></span>
                        <p>
                            <span>地址管理</span>
                            <span>></span>
                        </p>
                    </li>
                    <li>
                        <span class="icon iconfont icon-refund"></span>
                        <p>
                            <span>我的客服</span>
                            <span>></span>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="user-limit">到底了噢！ </div>
        </div>

    </div>
</template>
<script>
export default {

    methods: {
        go_to_login() {
            this.$router.push('/login');
        },
        go_to_address() {
            this.$router.push('/address');
        },
        loginout() {
            this.$router.push('/loginout');
        }
    }
}
</script>
<style lang="scss" scoped>
@mixin paddingLR($left:.3rem, $right:.3rem) {
    padding-left: $left;
    padding-right: $right;
    box-sizing: border-box;
}

.user {
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    -webkit-flex-direction: column;
    background-color: #eeeeee;
}

.user-header {
    height: 0.9rem;
    line-height: .9rem;
    text-align: center;
    background-color: #fff;
    @include paddingLR;
    position: relative;
    span {
        font-size: .45rem;
        &:first-child {
            position: absolute;
            left: .3rem;
        }
        &:last-child {
            position: absolute;
            right: .3rem;
        }
        &:nth-child(2) {
            font-size: .32rem;
        }
    }
}

.user-wraper {
    -webkit-flex: 1;
    overflow-y: scroll;
}

.user-banner {
    height: 1.96rem;
    background: url('../../imgs/user/user-bg.png') no-repeat 100% 100%;
    display: -webkit-flex;
    -webkit-flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 1.22rem;
        height: 1.22rem;
    }
    span {
        font-size: .3rem;
        color: #fff;
        margin-top: .1rem;
    }
}

.user-shop {
    height: 1.7rem;
    background-color: #fff;
    border-bottom: .01rem solid #ccc;
    @include paddingLR;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    color: #fc4141;
    p {
        span {
            &:first-child {
                font-size: .76rem;
                margin-right: .16rem;
            }
            &:last-child {
                font-size: .36rem;
                position: relative;
                top: -.12rem;
            }
        }
    }
    &>span {
        font-size: .36rem;
    }
}

.user-nav {
    position: relative;
    margin-bottom: .2rem;
    ul {
        background-color: #fff;
        display: -webkit-flex;
        li {
            width: 20%;
            height: 1.48rem;
            display: -webkit-flex;
            -webkit-flex-direction: column;
            justify-content: center;
            align-items: center;
            span {
                font-size: .28rem;
                &:first-child {
                    margin-bottom: .18rem;
                    font-size: .4rem;
                }
            }
        }
    }
    &>span {
        position: absolute;
        right: 0;
        bottom: .28rem;
        font-size: .28rem;
    }
}

.user-list {
    background-color: #fff;
    margin-bottom: .2rem;
    ul {
        li {
            height: 1rem;
            display: -webkit-flex;
            align-items: center;
            &>span {
                padding-left: .3rem;
                box-sizing: border-box;
                font-size: .36rem;
                margin-right: .13rem;
            }
            p {
                height: 100%;
                -webkit-flex: 1;
                display: -webkit-flex;
                justify-content: space-between;
                align-items: center;
                padding-right: .3rem;
                box-sizing: border-box;
                border-bottom: .01rem solid #e5e5e5;
                span {
                    font-size: .3rem;
                }
            }
        }
    }
}

.user-limit {
    line-height: 1.06rem;
    font-size: .26rem;
    text-align: center;
}
</style>
