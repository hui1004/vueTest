<template>
    <div class="login-register">
        <div class="login" v-if="if_login">
            <div class="login-header">
                <span class="icon iconfont icon-back" @click="go_back"></span>
                <span>登录717</span>
                <span @click="if_login = false">注册</span>
            </div>
            <div class="login-wraper">
                <div class="login-input">
                    <p>
                        <i class="icon iconfont icon-people"></i>
                        <input type="text" name="" id="" placeholder="请输入您的手机号" v-model.trim="login_phone">
                    </p>
                    <p>
                        <i class="icon iconfont icon-people"></i>
                        <input type="password" name="" id="" placeholder="请输入您的密码" v-model.trim="login_password">
                    </p>
                </div>
                <div class="login-btn">
                    <input type="button" name="" id="" value="立即登录" @click="login">
                    <p>
                        <a href="javascript:;">忘记密码?</a>
                    </p>

                </div>
                <div class="login-other">
                    <div>
                        <p>使用第三方账号登录</p>
                    </div>
                    <ul>
                        <li>
                            <img src="../../imgs/login/wechat.png" alt="wechat">
                            <span>微信</span>
                        </li>
                        <li>
                            <img src="../../imgs/login/qq.png" alt="qq">
                            <span>QQ</span>
                        </li>
                        <li>
                            <img src="../../imgs/login/weibo.png" alt="weibo">
                            <span>微博</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="login" v-else>
            <div class="login-header">
                <span class="icon iconfont icon-back" @click="go_back"></span>
                <span>注册717</span>
                <span @click="if_login = true">登录</span>
            </div>
            <div class="login-wraper">
                <div class="login-input">
                    <p>
                        <i class="icon iconfont icon-people"></i>
                        <input type="text" name="" id="" placeholder="请输入您的手机号" v-model.trim="register_phone">
                    </p>
                    <p>
                        <i class="icon iconfont icon-people"></i>
                        <input type="text" name="" id="" placeholder="请输入验证码" v-model.trim="valid">
                        <button class="valid" @click="get_valid()" ref="btn">获取验证码</button>
                    </p>
                    <p>
                        <i class="icon iconfont icon-people"></i>
                        <input type="password" name="" id="" placeholder="请输入您的密码" v-model.trim="register_password">
                    </p>
                </div>
                <div class="login-btn">
                    <input type="button" name="" id="" value="立即注册" @click="register">
                </div>
            </div>
        </div>
        <tips :active="isActive" :desc="desc"></tips>
    </div>
</template>
<script>
import tips from '../../components/tips/tips.vue';
export default {
    data() {
        return {
            if_login: true,
            register_phone: '',
            register_password: '',
            valid: '',
            login_phone: '',
            login_password: '',
            isActive: false,
            desc: ''
        }
    },
    methods: {
        go_back: function() {
            this.$router.go(-1);
        },
        get_valid() {
            let count = 3;
            let id = setInterval(() => {
                count--;
                this.$refs.btn.innerHTML = count + '后重新发送';
                this.$refs.btn.disabled = true;
                this.$refs.btn.style.borderColor = '#666';
                this.$refs.btn.style.color = '#666';
                if (count < 0) {
                    this.$refs.btn.disabled = false;
                    this.$refs.btn.innerHTML = '重新发送';
                    this.$refs.btn.style.borderColor = '#fc4141';
                    this.$refs.btn.style.color = '#fc4141';
                    clearInterval(id);
                }
            }, 1000)
            this.$http.post('/verifycode', { pn: this.register_phone }).then(function(params) {
                console.log(params.data);
            })
        },
        register() {
            let telReg = /^1(3|5|7|8)\d{9}$/;
            let pwdReg = /^\w{6,20}$/;
            if (telReg.test(this.register_phone) && pwdReg.test(this.register_password)) {

                this.$http.post('/register', {
                    phone_number: this.register_phone,
                    verify_code: this.valid,
                    password: this.register_password
                }).then((params) => {
                    if (params.data.code == 1) {
                        this.if_login = true
                    } else {
                        this.show_mark(params.data.msg);
                    }
                })
            } else {
                this.show_mark('用户名或密码格式错误');
            }
        },
        login() {
            let telReg = /^1(3|5|7|8)\d{9}$/;
            let pwdReg = /^\w{6,20}$/;
            if (telReg.test(this.login_phone) && pwdReg.test(this.login_password)) {

                this.$http.post('/login', {
                    phone: this.login_phone,
                    password: this.login_password
                }).then((res) => {
                    if (res.data.token) {
                        document.cookie = "717-token=" + res.data.token;
                        this.$router.push({ name: 'user' })
                    } else {
                        this.show_mark(res.data.msg);
                    }
                })

            } else {
                this.show_mark('用户名或密码格式错误');
            }
        },
        show_mark(desc) {
            this.desc = desc;
            this.isActive = true;
            setTimeout(() => {
                this.isActive = false;
            }, 1500)
        }


    },
    components: {
        tips
    }
}
</script>
<style lang="scss" scoped>
@mixin paddingLR($left:.3rem, $right:.3rem) {
    padding-left: $left;
    padding-right: $right;
    box-sizing: border-box;
}

.login-register {
    width: 100%;
    height: 100%;
}

.login {
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    -webkit-flex-direction: column;
    background-color: #f4f4f4;
}

.login-header {
    width: 100%;
    line-height: 0.9rem;
    border-bottom: .01rem solid #ccc;
    background-color: #fff;
    padding-top: .3rem;
    position: relative;
    margin-bottom: .2rem;
    text-align: center;
    span {
        font-size: .34rem;
        &:nth-of-type(1) {
            position: absolute;
            top: .28rem;
            left: .3rem;
        }
        &:nth-of-type(3) {
            position: absolute;
            top: .28rem;
            right: .3rem;
            color: #fc4141;
        }
    }
}

.login-wraper {
    -webkit-flex: 1;
    overflow-y: scroll;
}

.login-input {
    @include paddingLR;
    background-color: #fff;
    margin-bottom: 1.2rem;
    p {
        height: 1.2rem;
        position: relative;
        i {
            position: absolute;
            left: 0;
            top: .36rem;
            font-size: .5rem;
        }
        input {
            width: 100%;
            height: 100%;
            border-width: 0;
            text-indent: .65rem;
        }
        .valid {
            position: absolute;
            top: .2rem;
            right: 0;
            width: 2.02rem;
            font-size: .3rem;
            line-height: 0.78rem;
            border-radius: 30px;
            border: .01rem solid #fc4141;
            text-align: center;
            color: #fc4141;
            background-color: #fff;
        }
    }
}

.login-btn {
    text-align: center;
    input {
        width: 5.54rem;
        line-height: 1.1rem;
        text-align: center;
        color: #fff;
        font-size: .3rem;
        border-radius: 30px;
        background-color: #fc4141;
        border-width: 0;
    }
    p {
        width: 5.5rem;
        margin: .3rem auto 0;
        text-align: right;
        a {
            font-size: .26rem;
            text-decoration: underline;
        }
    }
}

.login-other {
    margin-top: 2.6rem;
    @include paddingLR(.75rem, .75rem);
    div {
        border-bottom: .01rem solid #ccc;
        position: relative;
        p {
            width: 3.36rem;
            position: absolute;
            font-size: .3rem;
            text-align: center;
            background-color: #f4f4f4;
            top: -.2rem;
            left: 24%;
        }
    }
    ul {
        display: -webkit-flex;
        @include paddingLR(.2rem, .2rem);
        li {
            width: 33.3%;
            height: 2.8rem;
            display: -webkit-flex;
            justify-content: center;
            align-items: center;
            -webkit-flex-direction: column;
            img {
                width: 1.2rem;
                height: 1.2rem;
            }
            span:last-child {
                font-size: .28rem;
                margin-top: .2rem;
            }
        }
    }
}
</style>


