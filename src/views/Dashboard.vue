<template>
  <b-container fluid>
    <h2>Mijn captions</h2>
    <b-row>
      <b-col lg="3">
        <div class="video-item">
          <!-- v-for="video in allVideos" :key="video.playlist[0].mediaid" -->
          <img :src="video.playlist[0].image" alt srcset />
          <p>
            <strong>{{ video.title }}</strong>
          </p>
          <p>{{ getTime(video.playlist[0].duration) }}</p>
          <router-link :to="{name: 'Video', params: {id: video.playlist[0].mediaid}}">
            <eye-icon size="1.5x" class="icon"></eye-icon>
          </router-link>
          <router-link :to="{name: 'EditCaptionItem', params: {id: video.playlist[0].mediaid}}">
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
    //...mapActions(["fetchVideos"]),
    ...mapActions(["fetchVideo"]),
    getTime(time) {
      var min = Math.floor(time / 60);
      var sec = time % 60;
      return min + ":" + (sec < 10 ? "0" : "") + sec;
    }
  },
  computed: {
    //...mapGetters(["allVideos"])
    ...mapGetters(["video"])
  },
  components: {
    EditIcon,
    EyeIcon
  },
  created() {
    //this.fetchVideos();
    this.fetchVideo("MeBQjS1i");
  }
};
</script>

<style scoped>
</style>