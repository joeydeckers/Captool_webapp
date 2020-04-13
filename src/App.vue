<template>
  <div id="app">
    <Navbar/>
    <router-view/>
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
