<template>
    <div class="home">
        <div class="person">
            <div class="home-title"></div>
            <div class="f-select"></div>
            <router-link :to="{name:'question',params:{step:1},query:{type:1}}">
                <div class="f-like"></div>
            </router-link>
            <router-link :to="{name:'question',params:{step:1},query:{type:0}}">
                <div class="f-wenke"></div>
            </router-link>
        </div>

        <div class="left-hand"></div>
        <div class="right-hand"></div>
        <div class="home-correct"></div>
        <div class="home-error"></div>

    </div>
</template>

<script>
export default {
  beforeRouteEnter:function(to,from,next){
      setTimeout(function() {
          next()
      }, 1500);
  }
}
</script>

<style lang="scss" scoped>

%bgcover {
    background-size: cover;
}

%bgcontain {
    background-size: contain;
}
.home{
    width: 100%;
    height: 100%;
}
.person {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    background-image: url('../../imgs/home-pepole.png');
    background-repeat: no-repeat;
    @extend %bgcontain;
    position: relative;
}

.home-title {
    width: 1.6rem;
    height: 1.65rem;
    background-image: url('../../imgs/home-title.png');
    background-repeat: no-repeat;
    @extend %bgcontain;
    position: absolute;
    top: 6%;
    left: 25%;
}

.f-select {
    width: 2.08rem;
    height: 0.34rem;
    background-image: url('../../imgs/f-select.png');
    background-repeat: no-repeat;
    @extend %bgcontain;
    position: absolute;
    left: 15%;
    top: 2rem;
}

.f-like,
.f-wenke {
    width: 1.2rem;
    height: 1.29rem;
    position: absolute;
    top: 2.3rem;
}

.f-like {
    background-image: url('../../imgs/f-like.png');
    background-repeat: no-repeat;
    @extend %bgcontain;
    left: 8%;
    top: 2.4rem;
}

.f-wenke {
    background-image: url('../../imgs/f-wenke.png');
    background-repeat: no-repeat;
    @extend %bgcontain;
    right: 2%;
}

.left-hand,
.right-hand {
    width: .32rem;
    height: 1.08rem;
    position: absolute;
}

.left-hand {
    background-image: url('../../imgs/home-left-hand.png');
    background-repeat: no-repeat;
    @extend %bgcontain;
    top: 50%;
    left: 0;
}

.right-hand {
    background-image: url('../../imgs/home-right-hand.png');
    background-repeat: no-repeat;
    @extend %bgcontain;
    top: 46%;
    right: 0;
}

.home-correct,
.home-error {
    position: absolute;
    bottom: 10%;
}

.home-correct {
    width: .5rem;
    height: 1.3rem;
    background-image: url('../../imgs/home-icon-1.png');
    background-repeat: no-repeat;
    @extend %bgcontain;
    left: 20%;
}

.home-error {
    width: .5rem;
    height: 0.74rem;
    background-image: url('../../imgs/home-icon-2.png');
    background-repeat: no-repeat;
    @extend %bgcontain;
    right: 20%;
    bottom: 15%;
}
</style>

