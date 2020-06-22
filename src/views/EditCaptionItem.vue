<template>
  <div>
    <b-container fluid style="margin-top: 50px">
      <b-row>
        <b-col lg="3">
          <div class="video-item">
            <h2>{{ video.title }}</h2>
            <!-- src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt" -->

            <vue-plyr >
              <video id="video" crossorigin playsinline captionsenabled :src="video.sources[1].file" controls data-plyr-config='{ "captions":{ active: true } }'>
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
              <p style="margin-top: 0;margin-bottom: 0;font-weight: 600;">Begin</p>
              <b-form-input id="range-2"  v-model="min" type="range" min="0" :max="maxValue" step="0.01"></b-form-input>
              <div class="mb-2">Waarde: {{ min }}</div>
              <!-- <b-input
                v-model="min"
                type="number"
                placeholder="Begin"
              ></b-input>-->
            </b-col>
            <b-col lg="6">
              <p style="margin-top: 0;margin-bottom: 0;font-weight: 600;">Einde</p>
              <b-form-input id="range-2"  v-model="max" type="range" min="0" :max="maxValue" step="0.01"></b-form-input>
<div class="mb-2">Waarde: {{ max }}</div>
            </b-col>
          </b-row>

          <b-input
            style="margin-top: 20px"
            v-model="text"
            maxlength="30"
            placeholder="Jouw caption"
          ></b-input>
          <div class="error" v-if="!$v.caption.required">Dit veld is verplicht</div>

          <Button
            style="margin-top: 20px; margin-right:20px;"
            buttonText="Toevoegen"
            @click.native="addSubtitle()"
          ></Button>
          <Button style="margin-top: 20px" buttonText="Exporteren" @click.native="createVTT()"></Button>
          <!-- <Button><font-awesome-icon icon="plus" style="color:#fff;"/></Button> -->

          <draggable
            class="list-group topper"
            tag="ul"
            v-model="words"
            v-bind="dragOptions"
            @change="onChange"
            :move="onMove"
            @start="isDragging = true"
            @end="isDragging = false"
          >
            <transition-group type="transition" :name="'flip-list'">
              <li class="list-group-item" v-for="element in words" :key="element.id">
                <!-- <span class="badge">{{ element.id }}</span> -->
                {{ element.start }} - {{ element.end }} |
                <strong>{{ element.text }}</strong>
                <Button
                  class="delete-btn"
                  style="display: block;float: right; background: red !important; padding: 3px !important; padding-right:8px !important; padding-left:8px !important; margin-top:-3px !important; "
                  buttonText="Delete"
                  @click.native="deleteItem(element)"
                ></Button>
              </li>
            </transition-group>
          </draggable>
        </b-col>
      </b-row>
    </b-container>
    <b-toast
      id="example-toast"
      title="BootstrapVue"
      class="b-toaster-top-right"
      static
      no-auto-hide
    ></b-toast>
  </div>
</template>

<script>
// import "vue-range-component/dist/vue-range-slider.css";
// import VueRangeSlider from "vue-range-component";
import { required } from "vuelidate/lib/validators";
import VuePlyr from "vue-plyr";
import { mapGetters, mapActions } from "vuex";
import Button from "@/components/Button.vue";
import draggable from "vuedraggable";
const vttToJson = require("vtt-to-json");
//const vttToJson = require("vtt-json")

const sampleWords = [];
const formatSeconds = seconds =>
  new Date(seconds.toFixed(3) * 1000).toISOString().substr(11, 12);

const vttGenerator = vttJSON => {
  let vttOut = "";
  vttJSON.forEach(v => {
    vttOut += `\n${formatSeconds(parseFloat(v.start)).replace(
      ".",
      "."
    )} --> ${formatSeconds(parseFloat(v.end)).replace(
      ".",
      "."
    )}\n${v.text.trim()}`;
  });
  return vttOut;
};

export default {
  data() {
    return {
      value: [0],
      max: 1,
      maxValue: 0,
      min: 0,
      words: sampleWords,
      text: "",
      vtt: "",
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  validations: {
    caption: {
      required
    }
  },
  methods: {
    makeToast(variant = null, titleToast, bodyToast) {
      this.$bvToast.toast(bodyToast, {
        title: titleToast,
        variant: variant,
        solid: true
      });
    },
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    deleteItem(itemIndex) {
      this.makeToast(
        "danger",
        "Caption verwijderen",
        "De caption is succesvol verwijderd"
      );

      this.sampleWords = this.removeItemOnce(sampleWords, itemIndex);
      this.words = this.removeItemOnce(sampleWords, itemIndex);
      this.reorderArray(sampleWords);
      const vttData = vttGenerator(this.words);

      this.setCaptionData({
        id: this.$route.params.id,
        data: vttData
      });
      this.getCaptionData(this.$route.params.id);
    },
    removeItemOnce(arr, value) {
      var i = 0;
      while (i < arr.length) {
        if (arr[i] === value) {
          arr.splice(i, 1);
        } else {
          ++i;
        }
      }
      return arr;
    },
    onChange(data) {
      this.words = this.array_move(data.moved, sampleWords);
      this.reorderArray(this.words);
      this.sampleWords = this.array_move(data.moved, sampleWords);
      this.reorderArray(sampleWords);
      const vttData = vttGenerator(this.words);
      this.setCaptionData({
        id: this.$route.params.id,
        data: vttData
      });
      this.getCaptionData(this.$route.params.id);
    },
    array_move(event, originalArray) {
      const movedItem = originalArray.find(
        (item, index) => index === event.oldIndex
      );
      const remainingItems = originalArray.filter(
        (item, index) => index !== event.oldIndex
      );

      const reorderedItems = [
        ...remainingItems.slice(0, event.newIndex),
        movedItem,
        ...remainingItems.slice(event.newIndex)
      ];

      return reorderedItems;
    },
    reorderArray(arr) {
      arr.forEach((item, n) => {
        let sampleObj = {
          id: n + 1,
          start: item.start,
          end: item.end,
          text: item.text,
          fixed: false
        };
        arr[n] = sampleObj;
      });
    },
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
        this.maxValue = Math.floor(video.duration);
        this.getCaptionData(this.$route.params.id);

        setTimeout(() => {
          this.vtt =
            "https://i346784core.venus.fhict.nl/StaticFiles/" +
            this.$route.params.id +
            ".vtt";

          vttToJson(this.captionData.caption).then(result => {
            const newResult = [];
            result.forEach(item => {
              if (item.part != "") {
                newResult.push(item);
              }
            });
            newResult.forEach((item, n) => {
              let sampleObj = {
                id: n + 1,
                start: item.start
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  .replace(/.$/, ""),
                end: item.end
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  .replace(/.$/, ""),
                text: item.part,
                fixed: false
              };
              sampleWords.push(sampleObj);
            });
            this.words = sampleWords;
          });
        }, 1000);
      }, 1000);
    },

    createVTT() {
      const vttData = vttGenerator(sampleWords);
      if (vttData != "") {
        this.makeToast(
          "success",
          "VTT exporteren",
          "Jouw VTT-bestand is successvol aangemaakt."
        );

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
      } else {
        this.makeToast(
          "danger",
          "VTT exporteren",
          "Voeg eerst een caption toe voordat je het kan exporteren."
        );
      }
    },
    addSubtitle() {
      if (this.max != "" && this.min != "" && this.text != "") {
        this.makeToast(
          "success",
          "Caption aanmaken",
          "Jouw caption is successvol aangemaakt."
        );
        const id = sampleWords.length + 1;
        sampleWords.push({
          id: id,
          start: this.min,
          end: this.max,
          text: this.text,
          fixed: false
        });
        const vttData = vttGenerator(sampleWords);

        this.setCaptionData({
          id: this.$route.params.id,
          data: vttData
        });
        this.words = sampleWords;
        this.getCaptionData(this.$route.params.id);
      } else {
        this.makeToast(
          "danger",
          "Caption aanmaken",
          "Voer eerst een caption in."
        );
      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    },
    ...mapGetters(["video", "captionData"])
  },
  created() {
    this.createVideo();
  },
  watch: {
    /* eslint-disable no-unused-vars */
    $route(to, from) {
      this.createVideo();
    },
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
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
