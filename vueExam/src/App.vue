<template>
  <div id="app">
    <router-view></router-view>
    <mask-view></mask-view>
  </div>
</template>

<script>
import maskView from './components/global_mask.vue';
export default {
  name: 'app',
  components:{
    "mask-view":maskView
  }
}
</script>

<style lang="scss">
@import url('./css/reset.css');

html,
body {
  height: 100%;
}

body {
  background-image: url('./imgs/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  font-size: .12rem;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
