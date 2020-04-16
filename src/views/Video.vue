<template>
  <div id="video">
    <p>{{ video.title }}</p>
    <iframe
      :src="video.playlist[0].link"
      :title="video.title"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchVideo"])
  },
  computed: {
    ...mapGetters(["video"])
  },
  created() {
    this.fetchVideo(this.$route.params.id); // "MeBQjS1i"
  }
};
</script>

<style scoped>
</style>