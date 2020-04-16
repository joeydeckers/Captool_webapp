<template>
  <div>
    <b-container fluid style="margin-top: 50px">
      <b-row>
        <b-col lg="3">
          <div class="video-item">
            <p>{{ video.title }}</p>
            <iframe
              :src="video.playlist[0].link"
              :title="video.title"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </b-col>
        <b-col lg="6">
          <b-input placeholder="Jouw caption"></b-input>
          <vue-range-slider
            :bg-style="bgStyle"
            :tooltip-style="tooltipStyle"
            :process-style="processStyle"
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
      max: ""
    };
  },
    methods: {
    ...mapActions(["fetchVideo"]),
  },
  computed: {
    ...mapGetters(["video"])
  },
  created() {
    this.fetchVideo("MeBQjS1i");
    setTimeout(() => {
      this.value.push(Math.floor(this.video.playlist[0].duration));
      this.max = Math.floor(this.video.playlist[0].duration);
    }, 500);
  },
  components: {
    VueRangeSlider
  },
};
</script>

<style>
</style>