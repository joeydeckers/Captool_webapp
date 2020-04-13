<template>
  <div>
      <b-container fluid style="margin-top: 50px">
          <b-row>
              <b-col lg="3">
                  <div class="video-item">
                      <video id="video" width="300px" controls>
                        <source src="https://www.w3schools.com/tags/mov_bbb.mp4" type="video/mp4">
                        <source src="https://www.w3schools.com/tags/mov_bbb.ogg" type="video/ogg">
                      </video>
                  </div>
              </b-col>
              <b-col lg="6">
                <b-input placeholder="Jouw caption"></b-input>  
                <vue-range-slider :bg-style="bgStyle" :tooltip-style="tooltipStyle" :process-style="processStyle" v-model="value" :max ="max"></vue-range-slider>
                <button>Save</button>
              </b-col>
              <b-col lg="3">

              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
export default {
  data() {
    return {
      value: [0],
      max: ''
    }
  },
  components:{
    VueRangeSlider
  },
  created() {
    setTimeout(() => {
        let vid = document.getElementById("video");
        this.value.push(Math.floor(vid.duration));  
        this.max = Math.floor(vid.duration);
    }, 500);
  }
}
</script>

<style>

</style>