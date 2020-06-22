<template>
  <div id="app">
    <Navbar/>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view appear style="animation-duration: 0.5s; transform: translate3d(0,0,0); box-shadow: 0 0 0 #000;"/>
    </transition>
    <!-- <router-view/> -->
  </div>
</template>


<style lang="scss">
  @import './assets/css/main.css';
</style>

<script>
import Navbar from  '@/components/Navbar.vue'
export default {
  components:{
    Navbar
  }
}
</script>
