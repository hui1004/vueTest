<template>
    <div class="login">
        <div class="login-header">
            <span class="icon iconfont icon-back"></span>
            <span>绑定手机号</span>
        </div>
        <div class="login-wraper">
            <div class="login-input">
                <p>
                    <i class="icon iconfont icon-people"></i>
                    <input type="text" name="" id="" placeholder="请输入您的手机号">
                </p>
                <p>
                    <i class="icon iconfont icon-people"></i>
                    <input type="text" name="" id="" placeholder="请输入验证码">
                    <span class="valid">获取验证码</span>
                </p>
            </div>
            <div class="login-btn">
                <input type="button" name="" id="" value="确认绑定">
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@mixin paddingLR($left:.3rem,$right:.3rem){
    padding-left: $left;
    padding-right: $right;
    box-sizing: border-box;
}
.login{
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    -webkit-flex-direction: column;
    background-color: #f4f4f4;
}
.login-header{
    width: 100%;
    height: 0.9rem;
    border-bottom: .01rem solid #ccc;
    background-color: #fff;
    padding-top: .3rem;
    position: relative;
    margin-bottom: .2rem;
    span{
        font-size: .34rem;
        position: absolute;
        top: .4rem;
        &:first-child{
            left: .3rem;
        }
        &:last-child{
            right: .3rem;
            color: #fc4141;
        }
        &:nth-child(2){
            width: 100%;
            text-align: center;
        }
    }

}
.login-wraper{
    -webkit-flex: 1;
    overflow-y: scroll;
}
.login-input{
    @include paddingLR;
    background-color: #fff;
    margin-bottom: 1.2rem;
    p{
        height: 1.2rem;
        position: relative;
        i{
            position: absolute;
            left: 0;
            top: .36rem;
            font-size: .5rem;
        }
        input{
            width: 100%;
            height: 100%;
            border-width: 0;
            text-indent: .65rem;
        }
        .valid{
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
        }
        
    }
}
.login-btn{
    text-align: center;
    input{
        width: 5.54rem;
        line-height: 1.1rem;
        text-align: center;
        color: #fff;
        font-size: .3rem;
        border-radius: 30px;
        background-color: #fc4141;
        border-width: 0;
    }
    p{
        width: 5.5rem;
        margin: .3rem auto 0;
        text-align: right;
        a{
            font-size: .26rem;
            text-decoration: underline;
        }
    }
}

</style>





