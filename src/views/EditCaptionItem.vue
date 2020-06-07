<template>
  <div>
    <b-container fluid style="margin-top: 50px">
      <b-row>
        <b-col lg="3">
          <div class="video-item">
            <h2>{{ video.title }}</h2>
            <!-- src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt" -->

            <vue-plyr>
              <video id="video" crossorigin playsinline :src="video.sources[1].file">
                <track default kind="captions" label="Current" :src="vtt" srclang="en" />
                <!-- <track
          default
          kind="captions"
          label="English"
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
          srclang="en"
                >-->
              </video>
            </vue-plyr>
          </div>
        </b-col>
        <b-col lg="6" style="margin-top: 45px">
          <b-row>
            <b-col lg="6">
              <p>Begin</p>
              <b-input v-model="min" type="number" placeholder="Begin"></b-input>
            </b-col>
            <b-col lg="6">
              <p>Einde</p>
              <b-input v-model="max" type="number" placeholder="max"></b-input>
            </b-col>
          </b-row>

          <b-input style="margin-top: 20px" v-model="text" placeholder="Jouw caption"></b-input>
          <Button
            style="margin-top: 20px; margin-right:20px;"
            buttonText="Toevoegen"
            @click.native="addSubtitle()"
          ></Button>
          <Button style="margin-top: 20px" buttonText="Exporteren" @click.native="createVTT()"></Button>
          <!-- <Button><font-awesomeme-icon icon="plus" style="color:#fff;"/></Button> -->
          <draggable v-model="words" @end="dragFunction()">
            <transition-group>
              <div
                style="margin-top: 10px;
                  border: 0.5px solid black;
                  border-radius: 5px;
                  margin-bottom: 10px;
                  padding: 10px;"
                v-for="subtitle in words"
                :key="subtitle.id"
              >
                <strong>#{{ subtitle.id }}</strong>
                {{ subtitle.start }} -
                {{ subtitle.end }} |
                <strong>{{ subtitle.text }}</strong>
              </div>
            </transition-group>
          </draggable>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import "vue-range-component/dist/vue-range-slider.css";
// import VueRangeSlider from "vue-range-component";
import VuePlyr from "vue-plyr";
import { mapGetters, mapActions } from "vuex";
import Button from "@/components/Button.vue";
import draggable from "vuedraggable";

const sampleWords = [];
const formatSeconds = seconds =>
  new Date(seconds.toFixed(3) * 1000).toISOString().substr(11, 12);

const vttGenerator = vttJSON => {
  let vttOut = "";
  vttJSON.forEach((v, i) => {
    vttOut += `${i + 1}\n${formatSeconds(parseFloat(v.start)).replace(
      ".",
      "."
    )} --> ${formatSeconds(parseFloat(v.end)).replace(
      ".",
      "."
    )}\n${v.text.trim()}\n\n`;
  });
  return vttOut;
};

export default {
  data() {
    return {
      value: [0],
      max: 0,
      min: 1,
      words: sampleWords,
      text: "",
      vtt: ""
    };
  },
  methods: {
    ...mapActions([
      "fetchVideo",
      "setCaptionData",
      "getCaptionData",
      "getCaption"
    ]),

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

    createVTT() {
      const vttData = vttGenerator(sampleWords);
      console.log(vttData);
      const blob = new Blob([vttData], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = this.$route.params.id + ".vtt";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/vtt", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    vttToJson(data) {
      var lines = data.split("\n");
      var buffer = {
        text: ""
      };

      lines.forEach(function(line) {
        if (!buffer.id) buffer.id = line;
        else if (!buffer.start) {
          var range = line.split(" --> ");
          const firstOne = range[0].replace(".000", "");
          const secondOne = range[1].replace(".000", "");
          buffer.start = firstOne
            .split(":")
            .reverse()
            .reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0);
          buffer.end = secondOne
            .split(":")
            .reverse()
            .reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0);
        } else if (line !== "") {
          buffer.text.push(line);
        }
      });
      sampleWords.push(buffer);
    },

    addSubtitle() {
      if (this.max != "" && this.min != "" && this.text != "") {
        const id = sampleWords.length + 1;
        sampleWords.push({
          id: id,
          start: this.min,
          end: this.max,
          text: this.text
        });
        const vttData = vttGenerator(sampleWords);
        console.log(vttData);
        this.setCaptionData({
          id: this.$route.params.id,
          data: vttData
        });
      }
    },
    dragFunction() {
      const vttData = vttGenerator(sampleWords);
      console.log(vttData);
      this.setCaptionData({
        id: this.$route.params.id,
        data: vttData
      });
    }
  },
  computed: {
    ...mapGetters(["video", "captionData"])
  },
  created() {
    this.createVideo();
  },
  watch: {
    /* eslint-disable no-unused-vars */
    $route(to, from) {
      this.createVideo();
    }
  },
  components: {
    // VueRangeSlider
    VuePlyr,
    Button,
    draggable
  }
};
</script>
