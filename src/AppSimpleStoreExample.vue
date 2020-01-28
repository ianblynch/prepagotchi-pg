<template>
  <div
    class="app-container full-card flex flex-col justify-start text-center w-full break-words h-full fixed items-center background-color-rad-0 p-8 pt-0"
  >

    <!-- background elements -->
    <div class="layer--background-elements fixed h-full w-full">
      <CardElement 
        v-for="(bgElement, bgElementIndex) in currentCardInstance.backgroundElements"
        :key="`bgElement-${bgElementIndex}`"
        :element="bgElement"
        :defaults="currentCardInstance.defaults" 
      />
    </div>

    <!-- main elements -->
    <div class="layer--main-elements max-w-3xl p-16 block z-index-1 h-full w-full">
      <CardElement 
        v-for="(cardElement, cardElementIndex) in currentCardInstance.cardElements"
        :key="`card-element-${cardElementIndex}`"
        :element="cardElement"
        :defaults="currentCardInstance.defaults" 
      />
      <div class="p-16"></div>
    </div>

    <!-- foreground elements -->
    <!-- <div class="layer--foreground-elements fixed h-full w-full pointer-events-none z-index-2"> -->
      <CardElement 
        v-for="(fgElement, fgElementIndex) in currentCardInstance.foregroundElements"
        :key="`fgElement-${fgElementIndex}`"
        :element="fgElement" 
        :defaults="currentCardInstance.defaults" 
      />
    <!-- </div> -->

  </div>
</template>

<script>
// import * as textData from "./data/myStory4.js";
// import CardFrame from "./components/CardFrame.vue";
import CardElement from "./components/CardElement.vue";
import { store } from './data/store.js'
// import story from './data/story.js'
import story, { cards } from './data/story.js'

export default {
  name: "app",
  components: {
    CardElement
  },
  // props: {
  //   passedStoryData: {
  //     type: Object,
  //     default() {
  //       return {};
  //     }
  //   },
  //   passedAppData: {
  //     type: Object,
  //     default() {
  //       return {};
  //     }
  //   }
  // },
  data() {
    return {
      // storyData: this.passedStoryData,
      // appData: this.passedAppData,
      // currentBranch: {},
      storyData: story,
      storeState: store.state,
      cards
    };
  },
  // created() {
  //   if (Object.keys(this.storyData).length === 0) {
  //     this.storyData = textData.default;
  //     this.currentBranch = this.storyData.cardInstances[0]
  //   }
  // },
  computed: {
    currentCardInstance() {
      // debugger
      let draft
      this.cards().cardInstances.forEach((ci) => {
        if(ci.id === store.getValue('currentCardInstance')) {
          draft = ci
        }
      })
      return draft
    }
  }
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
