<template>
  <div class="result">
    <div class="seal"><img src="../../imgs/seal.png" alt=""></div>
    <div class="badge"></div>
    <h2>{{res.name}}</h2>
    <div class="subject">
      <b>主修课程 : </b>
      <span>{{res.majors}}</span>
    </div>
    <div class="special">
      <b>课程特色 : </b>
      <span>{{res.character}}</span>
    </div>
    <div class="btns">
      <a href="javascript:;"><img src="../../imgs/btn-intr.png" alt=""></a href="javascript:;">
      <a href="javascript:;"><img src="../../imgs/btn-share.png" alt=""></a href="javascript:;">
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      res: ''
    }
  },
  created: function() {
    this.$http.get('../../src/service/school_list.json').then(res => {
      this.res = res.data[this.random(0, 11)];
      console.log(this.res);
    })
  },
  methods: {
    random(min, max) {
      let rand = Math.floor(Math.random() * max - min);
      if (rand < 10) {
        rand = '0' + rand;
      }
      return 'school' + rand;
    }
  }
}
</script>
<style lang="scss" scoped>
 /* md5加密 拥有自己独立作用域 组件内写的css只对当前组件起作用*/
.result{
  width: 100%;
  height: 100%;
  margin: auto;
  background: url(../../imgs/bg-matriculate.png) center .46rem no-repeat;
  background-size: 324px 429px;
  padding-top: 2.18rem;
  position: relative;
  box-sizing: border-box;
  .seal{
      position: absolute;
      top: .49rem;
      right: .1rem;
      img{
          width: 1.27rem;
          height: 1.27rem;
      }
  }
  .badge{
    width: 0.5rem;
    height: 0.5rem;
    background: url('../../imgs/logo-huogeaoci.png');
    background-size: 100% auto;
    position: absolute;
    top: 1.35rem;
    left: 44%;
  }
  h2{
      font-size: .24rem;
      color: #333;
      font-weight: 400;
      text-align: center;   
  }
  .subject{
      width: 3rem;
      margin: .1rem auto 0;
      b{
          font-size: .14rem;
          color: #333;
      }
      span{
          color: #393939;
          font-size: .14rem;
      }
  }
  .special{
      width: 3rem;
      margin: .1rem auto 0;
      b{
          color: #333;
          font-size: .14rem;
      }
      span{
          color: #393939;
          font-size: .14rem;
      }
  }
  .btns{
      margin: .5rem auto 0;
      display: flex;
      justify-content: space-between;
      padding-left: .2rem;
      padding-right: .2rem;
      img{
          width: 1.4rem;
          height: .6rem;
      }    
  }
}
</style>


