<template>
    <div
        class="app-container full-card flex flex-col justify-center text-center w-full break-words h-full fixed items-center background-color-rad-0 p-2 overflow-hidden"
    >
        <!-- background elements -->
        <RadElement
            :key="`bgElement-${bgElementIndex}`"
            v-for="(bgElement, bgElementIndex) in backgroundElements"
            :element="bgElement"
        />

        <TamaCardFrame
            v-if="radiation===true"
            class="max-w-3xl block"
            :storyData="storyData"
            :branch="storyData.cardInstances[0]"
            :appData="appData"
            :cardElements="currentBranch.cardElements"
            @send-current-branch-to-app="currentBranch = arguments[0]"
        />
    </div>
</template>

<script>
import * as textData from './data/tama.json'
import TamaCardFrame from './components/TamaCardFrame.vue'
import RadElement from './components/RadElement.vue'
export default {
    name: 'app',
    components: {
        TamaCardFrame,
        RadElement,
    },
    props: {
        passedStoryData: {
            type: Object,
            default() {
                return {}
            },
        },
        passedAppData: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            storyData: this.passedStoryData,
            appData: this.passedAppData,
            radiation: true,
            appCard: 0,
            currentBranch: {},
        }
    },
    created() {
        if (Object.keys(this.storyData).length === 0) {
            this.storyData = textData.default
            this.currentBranch = this.storyData.cardInstances[0]
        }
    },
    methods: {
        updateAppCard() {
            this.appCard++
            if (this.appCard > 1) {
                this.appCard = 0
            }
        },
    },
    computed: {
        backgroundElements() {
            if (this.currentBranch.backgroundElements) {
                return this.currentBranch.backgroundElements
            } else {
                return []
            }
        },
        compCardElements() {
            if (this.currentBranch.cardElements) {
                return this.currentBranch.cardElements
            } else return []
        },
    },
    // watch: {
    //   currentBranch() {

    //   }
    // }
}
</script>

<style>
@import './assets/css/scr.css';
@import './assets/css/textly.css';
@import './assets/css/textly-utilities.css';
@font-face {
    font-family: EIGHTBITWONDER;
    src: url("./assets/fonts/8-BIT WONDER.TTF")
}

@font-face {
    font-family: slkscr;
    src: url("./assets/fonts/slkscr.ttf")
}
:root {
    --full: calc(100vh - 1rem);
}
.css-preview-container {
    height: 50px;
}
.app-container {
    image-rendering: pixelated;
    background-image: url("./assets/pngs/_dragons-logo-green-2017-1280.jpg");
    background-size: 300%;
    background-position: center center;
    font-family: slkscr;
    color: black;
}

#demo-app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.break-words {
    word-break: break-word;
}
#demo-app {
    background-color: black;
}

.jagged-border {
    border-color: black;
    border-style: solid;
    border-width: .125em 0;
    margin: 0 .25em;
    padding: .5em .375em;
    position: relative;
    z-index: 1;
}
.jagged-border:before {
    background-color: inherit;
    border: inherit;
    border-width: 0 .125em;
    bottom: .125em;
    content: '';
    left: -.25em;
    pointer-events: none;
    position: absolute;
    top: .125em;
    right: -.25em;
    z-index: -1;
}

.jagged-border:after {
    border: inherit;
    border-width: 0 .125em;
    bottom: 0;
    content: '';
    left: -.125em;
    position: absolute;
    top: 0;
    right: -.125em;
    z-index: -2;
}
.tama-button {
    margin: 1rem;
}
.centered-frame {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    background-color: gray;
}
#score {
    justify-self: start;
}
.pixelated {    
    image-rendering: crisp-edges;
}
.centered-guy {
    flex-grow: 1;
    flex-basis: auto;
    height: auto;        
    image-rendering: pixelated;
    padding: 25%;
    width:100%;
    height: 100%;
}

.centered-guy:before {
    content: '';
    padding-top: 100%;
}
.inset-screen {
    width: 50%;
    height: 300px;
}
.vert-flex-container {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
}
.horiz-flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
}
.tama-logic-vert-flex-container {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
}
.tama-logic-horiz-flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
}

#tama-logic {
    height: 100%;
    width: 100%;
}
#logic-three-buttons {
    margin-top: 20px;
    height: 20%;
}
.box{
    margin:25px;
    width:250px;
    height:250px;
    border: solid black;
    border-color: black;
    /* float:left;  */
}

.box1{
    /* border-width: 3px 4px 3px 5px;
    border-radius:95% 4% 92% 5%/4% 95% 6% 95%; */
    /* transform: rotate(2deg); */
}
.lvl1 {
    box-shadow: 16px 0 gray, -16px 0 gray, 0 -16px gray, 0 16px gray, 4px 0 0 8px gray, -4px 0 0 8px gray, 0 -4px 0 8px gray, 0 4px 0 8px gray, 20px 0 black, -20px 0 black, 0 -20px black, 0 20px black, 0 0 0 12px black, 0 8px 0 8px black, 0 -8px 0 8px black, 8px 0 0 8px black, -8px 0 0 8px black;
    /* margin: 20px auto; */
}

</style>
