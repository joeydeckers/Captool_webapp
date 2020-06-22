<template>
  <div>
    <b-container fluid style="margin-top: 50px">
      <b-row>
        <b-col lg="8">
          <div class="video-item">
            <vue-plyr>
              <video
                id="video"
                crossorigin
                playsinline
                :src="video.sources[1].file"
              >
                <track
                  default
                  kind="captions"
                  label="Current"
                  :src="vtt"
                  srclang="en"
                />
              </video>
            </vue-plyr>
          </div>
          <h2 style="margin-top:20px;margin-bottom:20px;">{{ video.title }}</h2>
        </b-col>
        <b-col lg="3">
          <h3 style="margin-left:5px;">Andere video's</h3>
          <b-row v-for="video in this.$store.getters.allVideos.playlist" :key="video.mediaid">

        <div v-if="video.mediaid != vid" class="video-item" style="margin-left: 20px;margin-right: 20px;">
          <img :src="video.image" alt srcset />
          <p>
            <strong>{{ video.title }}</strong>
        : {{ getTime(video.duration) }}</p>
        </div>
    </b-row>
        </b-col>
        
      </b-row>
    </b-container>
  </div>
</template>

<script>
import VuePlyr from "vue-plyr";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      value: [0],
      max: 0,
      min: 1,
      vtt: "",
      vid: this.$route.params.id
    };
  },
  methods: {
    ...mapActions([
      "fetchVideo",
      "setCaptionData",
      "getCaptionData",
      "getCaption",
      "fetchVideos"]),
    getTime(time) {
      var min = Math.floor(time / 60);
      var sec = time % 60;
      return min + ":" + (sec < 10 ? "0" : "") + sec;
    },

    createVideo() {
      this.fetchVideo(this.$route.params.id);
      setTimeout(() => {
        let video = document.getElementById("video");
        this.value.push(Math.floor(video.duration));
        this.max = Math.floor(video.duration);
        this.getCaptionData(this.$route.params.id);

        setTimeout(() => {
          this.vtt =
            "https://i346784core.venus.fhict.nl/StaticFiles/" +
            this.$route.params.id +
            ".vtt";
          
     
        }, 1000);
      }, 1000);
    },

  },
  computed: {

    ...mapGetters(["video", "captionData", "allVideos"]),
  },
  created() {
    this.createVideo();
    if (localStorage.capToolToken) {
      this.$store.dispatch("fetchUser", this.$store.getters.getAccessToken);
      setTimeout(() => {
        this.$store.dispatch(
          "fetchVideos",
          this.$store.getters.getUser.playlist,
        );
      }, 500);
    }
  },
  watch: {
    /* eslint-disable no-unused-vars */
    $route(to, from) {
      this.createVideo();
    },
  },
  components: {
    // VueRangeSlider
    VuePlyr,
  },
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.topper {
  margin-top: 30px;
}
</style>
