<template>
  <b-container fluid>
    <h2 v-if="this.$store.getters.allVideos.playlist">Mijn captions</h2>
    <b-row v-if="this.$store.getters.allVideos.playlist">
      <b-col lg="3" v-for="video in this.$store.getters.allVideos.playlist" :key="video.mediaid">
        <div class="video-item">
          <img :src="video.image" alt srcset />
          <div><p style=" white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;">
            <strong class="title">{{ video.title }}</strong>
         : {{ getTime(video.duration) }}</p>
          <router-link  :to="{name: 'CaptionItem', params: {id: video.mediaid}}">
            <eye-icon size="1.5x" class="icon"></eye-icon>
          </router-link>
          <router-link :to="{name: 'EditCaptionItem', params: {id: video.mediaid}}">
            <edit-icon size="1.5x" class="icon"></edit-icon>
          </router-link></div>
        </div>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <h3 style="text-align: center;">Voeg een afspeellijst toe van JWPlayer</h3>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { EditIcon, EyeIcon } from "vue-feather-icons";

export default {
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
    if (localStorage.capToolToken) {
      this.$store.dispatch("fetchUser", this.$store.getters.getAccessToken);
      setTimeout(() => {
        this.$store.dispatch(
          "fetchVideos",
          this.$store.getters.getUser.playlist
        );
      }, 500);
    }
  },
  // watch: {
  //   /* eslint-disable no-unused-vars */
  //   $route(to, from) {
  //         if (localStorage.capToolToken) {
  //     this.$store.dispatch("fetchUser", this.$store.getters.getAccessToken);
  //     setTimeout(() => {
  //       this.$store.dispatch(
  //         "fetchVideos",
  //         this.$store.getters.getUser.playlist
  //       );
  //     }, 500);
  //   }
  //   },
  // },
};
</script>

<style scoped>
</style>