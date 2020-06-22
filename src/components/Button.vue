<template>
  <button id="button" class="btn">
      <span v-if="this.$route.name !== 'Login' || this.$route.name !== 'Register' && this.buttonLoading !== true">{{buttonText}}</span>
      <b-spinner v-if="this.$route.name == 'Login' && this.buttonLoading == true || this.$route.name == 'Register' && this.buttonLoading == true" label="Spinning"></b-spinner>
  </button>
</template>

<script>
export default {
  props:['buttonText', 'buttonLoading'],

}
</script>
