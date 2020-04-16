<template>
  <b-container fluid>
    <h2>Mijn captions</h2>
    <b-row>
      <b-col lg="3" v-for="video in allVideos.playlist" :key="video.mediaid">
        <div class="video-item">
          <img :src="video.image" alt srcset>
          <p>
            <strong>{{ video.title }}</strong>
          </p>
          <p>: {{ getTime(video.duration) }}</p>
          <router-link :to="{name: 'CaptionItem', params: {id: video.mediaid}}">
            <eye-icon size="1.5x" class="icon"></eye-icon>
          </router-link>
          <router-link :to="{name: 'EditCaptionItem', params: {id: video.mediaid}}">
            <edit-icon size="1.5x" class="icon"></edit-icon>
          </router-link>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { EditIcon, EyeIcon } from "vue-feather-icons";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchVideos"]),
    getTime(time) {
      var min = Math.floor(time / 60);
      var sec = time % 60;
      return min + ":" + (sec < 10 ? "0" : "") + sec;
    }
  },
  computed: {
    ...mapGetters(["allVideos"])
  },
  components: {
    EditIcon,
    EyeIcon
  },
  created() {
    this.fetchVideos();
  }
};
</script>

<style scoped>
</style>