<template>
  <div>
    <b-container fluid style="margin-top: 50px">
      <b-row>
        <b-col lg="3">
          <div class="video-item">
            <h2>{{ video.title }}</h2>
            <!-- <iframe
              :src="video.link"
              :title="video.title"
              frameborder="0"
              allowfullscreen
              style="width: 100%; height: 350px;"
            ></iframe> -->
            <video controls id="video">
              <source :src="video.sources[1].file">
            </video>
          </div>
        </b-col>
        <b-col lg="6">
          <b-input placeholder="Jouw caption"></b-input>
          <vue-range-slider
           
            v-model="value"
            :max="max"
          ></vue-range-slider>
          <button>Save</button>
        </b-col>
        <b-col lg="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import "vue-range-component/dist/vue-range-slider.css";
import VueRangeSlider from "vue-range-component";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      value: [0],
      max: 0
    };
  },
    methods: {
    ...mapActions(["fetchVideo"]),
    createVideo(){
       this.fetchVideo(this.$route.params.id);
      setTimeout(() => {
        let video = document.getElementById('video');
        this.value.push(Math.floor(video.duration));
        this.max = Math.floor(video.duration);
        console.log(Math.floor(video.duration));
      }, 1000);
    }
  },
  computed: {
    ...mapGetters(["video"])
  },
  created() {
    this.createVideo();
  },
  watch:{
    /* eslint-disable no-unused-vars */
    $route(to, from){
        this.createVideo();
    }
  }, 
  components: {
    VueRangeSlider
  },
};
</script>

<style>
</style>