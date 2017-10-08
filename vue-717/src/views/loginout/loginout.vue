<template>
    <div class="setting">
        <div class="set-head">
            <div class="back" onclick="history.go(-1)">
                <i class="iconfont icon-left"></i>
            </div>
            <div class="set-title">
                <span>设置</span>
            </div>
        </div>
        <div class="set-cont">
            <ul>
                <li>
                    <span>我的头像</span>
                    <span><img src="../../assets/user.png" alt="">
                        <i class="iconfont icon-right"></i>
                    </span>
                </li>
                <li>
                    <span>用户名</span>
                    <span>路飞
                        <i class="iconfont icon-right"></i>
                    </span>
                </li>
                <li>
                    <span>我的二维码名片</span>
                    <span><img src="../../assets/code.png" alt="">
                        <i class="iconfont icon-right"></i>
                    </span>
                </li>
            </ul>
            <div class="login-out">
                <button @click="login_out">退出登录</button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    methods: {
        login_out() {
            let _this = this;
            let token = document.cookie.match(/717-token=(\d+)/)[1];
            let d = new Date();
            d.setTime(d.getTime() + -1 * 24 * 60 * 60 * 1000);
            document.cookie = "717-token=" + escape(token) + ";expires=" + d.toGMTString();
            this.$dialog.show({
                title:'提示信息',
                info:'您确定要删除吗',
                callback(){
                    _this.$router.push({name:'user'})
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.setting {
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    -webkit-flex-direction: column;
}

.set-head {
    height: 0.88rem;
    position: relative;
    text-align: center;
    line-height: .88rem;
    background: #fff;
    .back {
        position: absolute;
        padding: 0 .3rem;
        line-height: .88rem;
        left: 0;
        top: 0;
        .iconfont {
            font-size: .32rem;
            color: #333;
        }
    }
    .set-title {
        font-size: .32rem;
        color: #333;
    }
}

.set-cont {
    flex: 1;
    padding-top: .2rem;
    background: #eee;
    ul {
        background: #fff;
        li {
            height: 1.04rem;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .3rem;
            span {
                font-size: .32rem;
                color: #333;
            }
            &:first-child {
                height: 1.44rem;
                img {
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
            &:last-child {
                img {
                    width: 0.8rem;
                    height: 0.8rem;
                    vertical-align: middle;
                }
            }
        }
    }
    .login-out {
        text-align: center;
        margin-top: 1.6rem;
        button {
            width: 70%;
            height: 1.08rem;
            background: #fc4141;
            color: #fff;
            border-radius: .6rem;
            border: 0;
            font-size: .32rem;
        }
    }
}
</style>
