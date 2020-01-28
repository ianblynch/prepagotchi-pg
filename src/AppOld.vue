<template>
  <div
    class="app-container full-card bg-black flex flex-col justify-center text-center w-full break-words h-full fixed items-center background-color-rad-0 p-8 overflow-hidden"
  >
    <!-- background elements -->
    <RadElement 
      :key="`bgElement-${bgElementIndex}`"
      v-for="(bgElement, bgElementIndex) in backgroundElements"
      :element="bgElement" 
    />

    <card-frame
      v-if="radiation===true"
      class="text-white max-w-3xl p-16 block"
      :storyData="storyData"
      :branch="storyData.cardInstances[0]"
      :appData="appData"
      :cardElements="currentBranch.cardElements"
      @send-current-branch-to-app="currentBranch = arguments[0]"
    />

  </div>

</template>

<script>
import * as textData from "./data/tama.json";
import CardFrame from "./components/CardFrame.vue";
import RadElement from "./components/RadElement.vue";
export default {
  name: "app",
  components: {
    CardFrame,
    RadElement
  },
  props: {
    passedStoryData: {
      type: Object,
      default() {
        return {};
      }
    },
    passedAppData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      storyData: this.passedStoryData,
      appData: this.passedAppData,
      radiation: true,
      appCard: 0,
      currentBranch: {}
    };
  },
  created() {
    if (Object.keys(this.storyData).length === 0) {
      this.storyData = textData.default;
      this.currentBranch = this.storyData.cardInstances[0]
    }
  },
  methods: {
    updateAppCard() {
      this.appCard++
      if(this.appCard > 1) {
        this.appCard = 0
      }
    }
  },
  computed: {
    backgroundElements() {
      if(this.currentBranch.backgroundElements) {
        return this.currentBranch.backgroundElements
      } else {
        return []
      }
    },
    compCardElements() {
      if (this.currentBranch.cardElements) {
        return this.currentBranch.cardElements
      } else return []
    }
  },
  // watch: {
  //   currentBranch() {

  //   }
  // }
};
</script>

<style>
@import "./assets/css/scr.css";
@import "./assets/css/textly.css";
@import "./assets/css/textly-utilities.css";

.css-preview-container {
  height: 50px;
}

#demo-app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.break-words {
  word-break: break-word;
}
#demo-app {
  background-color: black;
}
</style>
