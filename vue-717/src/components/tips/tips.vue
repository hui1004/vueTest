<template>
  <div class="tips" :class="{'active':active}">
      <p class="tips-desc">{{desc}}</p>
  </div>
</template>
<script>
export default {
    props:{
        desc:{
            type: String,
            default:'添加购物车成功'
        },
        active:{}
    }
}
</script>
<style lang="scss">
    .tips{
        width: 70%;
        height: 0.6rem;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 30px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: none;
        .tips-desc{
            width: 100%;
            line-height: .6rem;
            text-align: center;
            color: #fff;
            font-size: .24rem;
        }
    }
    .active{
        display: block;
    }
</style>

