<template>
  <div>
    <b-container fluid style="margin-top: 50px">
      <b-row>
        <b-col lg="3">
          <div class="video-item">
            <h2>{{ video.title }}</h2>
          
        
           <vue-plyr>
      <video
        crossorigin
        playsinline
        poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
        :src="video.sources[1].file"
      >
       
       <track
          default
          kind="captions"
          label="English"
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
          srclang="en"
        >
      </video>
    </vue-plyr>

          </div>
        </b-col>
        <b-col lg="6">
<!--         
          <vue-range-slider
            v-model="value"
            :max="max"
            :min="min"
          ></vue-range-slider> -->
           <b-row>
              <b-col lg="6">
           <b-input  v-model="min" type="number" placeholder="Begin"></b-input>
            </b-col>
            <b-col lg="6">
            <b-input  v-model="max" type="number" placeholder="max"></b-input>
             </b-col>
 </b-row>

            <b-input style="margin-top: 20px" v-model="text" placeholder="Jouw caption"></b-input>
          <button style="margin-top: 20px" @click="addSubtitle()">Save caption</button> <button @click="createSrt()">Save SRT</button>
          <div style="margin-top: 20px" v-for="subtitle in words" :key="subtitle.id">
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
// import "vue-range-component/dist/vue-range-slider.css";
// import VueRangeSlider from "vue-range-component";
import VuePlyr from 'vue-plyr'
import { mapGetters, mapActions } from "vuex";

const sampleWords = [];
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
      min: 1,
      words: sampleWords,
      text: ''
    };
  },
    methods: {
    ...mapActions(["fetchVideo", "setCaptionData", "getCaptionData"]),
    
    createVideo(){
       this.fetchVideo(this.$route.params.id);
        this.getCaptionData(this.$route.params.id);
      setTimeout(() => {
        let video = document.getElementById('video');
        this.value.push(Math.floor(video.duration));
        this.max = Math.floor(video.duration);
        this.srtToJson(this.captionData);
      }, 1000);
    },

    createSrt(){
      const srtData = srtGenerator(sampleWords);
      console.log(srtData);
      const blob = new Blob([srtData], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = this.$route.params.id+".srt";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/srt', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
      
      // this.srtToJson(srtData);
    },
    srtToJson(data){
      var lines = data.split('\n');
      var buffer = {
          text: ''
      };

      lines.forEach(function(line) {
          if(!buffer.id)
              buffer.id = line;
          else if(!buffer.start) {
              var range = line.split(' --> ');
              const firstOne = range[0].replace(',000', '');
              const secondOne = range[1].replace(',000', '');
              buffer.start = firstOne.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0);
              buffer.end =  secondOne.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0);
          }
          else if(line !== ''){
              buffer.text.push(line);
          }
      })
      sampleWords.push(buffer);
      
    },
 
    addSubtitle(){
      const id = sampleWords.length + 1;
      sampleWords.push({id:id, start:this.min, end:this.max,text:this.text, })
      const srtData = srtGenerator(sampleWords);
      console.log(srtData)
       this.setCaptionData({
        id: this.$route.params.id,
        data: srtData,
      })
    }

  },
  computed: {
    ...mapGetters(["video", "captionData"]),
    
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
    // VueRangeSlider
    VuePlyr
  },
};
</script>

<style>
</style>