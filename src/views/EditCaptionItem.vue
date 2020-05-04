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
          <b-input  v-model="text" placeholder="Jouw caption"></b-input>
          <vue-range-slider
           
            v-model="value"
            :max="max"
          ></vue-range-slider>
          <button @click="addSubtitle()">Save caption</button> <button @click="createSrt()">Save SRT</button>
          <div v-for="subtitle in words" :key="subtitle.id">
            <p>
             {{subtitle.start}} - {{subtitle.end}} | <strong>{{ subtitle.text }}</strong>
            </p>
          </div>
          
        </b-col>
       <b-col lg="3" >
       
      </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import "vue-range-component/dist/vue-range-slider.css";
//import fs from 'fs';
import VueRangeSlider from "vue-range-component";
import { mapGetters, mapActions } from "vuex";

const sampleWords = [{
        "id": 0,
        "start": 13.02,
        "end": 13.17,
        "text": "There"
      },
      {
        "id": 1,
        "start": 13.17,
        "end": 13.38,
        "text": "is"
      },];
const formatSeconds = seconds => new Date(seconds.toFixed(3) * 1000).toISOString().substr(11, 12);

const srtGenerator = (vttJSON) => {
  let srtOut = '';
  vttJSON.forEach((v, i) => {
    srtOut += `${ i + 1 }\n${ formatSeconds(parseFloat(v.start)).replace('.', ',') } --> ${ formatSeconds(parseFloat(v.end)).replace('.', ',') }\n${ v.text.trim() }\n\n`;
  });

  return srtOut;
};

export default {
  data() {
    return {
      value: [0],
      max: 0,
      words: sampleWords,
      text: ''
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
    },
    createSrt(){
      const srtData = srtGenerator(sampleWords);
      console.log(srtData);

    },
    addSubtitle(){
      const id = sampleWords.length + 1;
      sampleWords.push({id:id, start:this.value[0], end:this.value[1],text:this.text, })
    }

  },
  computed: {
    ...mapGetters(["video"]),
    
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