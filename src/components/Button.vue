<template>
  <button id="button" class="btn">
      <span>{{buttonText}}</span>
      <!-- <b-spinner label="Spinning"></b-spinner> -->
  </button>
</template>

<script>
export default {
    props:['buttonText']
}
</script>
