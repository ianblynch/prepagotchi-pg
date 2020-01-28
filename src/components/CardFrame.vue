<template>
    <div id="card-frame" class="overflow-scroll">
        <RadElement 
            :key="`card-element-${cardElementIndex}`"
            v-for="(cardElement, cardElementIndex) in cardElements"
            :element="cardElement"
            @emit-set-new-card-and-branch="setNewCardAndBranch(...arguments)"
            @emit-update-global="updateGlobal(...arguments)"
            :globals="globals"
        />

        <!-- <card-header
            class="text-5xl"
            :text="currentCard.cardTitle"
            :appData="appData"
            :storyData="storyData"
        />
        <card-body
            class="text-lg my-10"
            :text="currentCard.cardText"
            :appData="appData"
            :storyData="storyData"
        />
        <card-path
            class="border-white border-solid border-2 m-2 p-2"
            v-bind:key="`path${pathIndex}`"
            v-for="(path, pathIndex) in currentBranch.cardOptions"
            :appData="appData"
            :storyData="storyData"
            :branchId="path.goToCard"
            :text="path.optionText"
            @emit-set-new-card-and-branch="setNewCardAndBranch(path)"
            :isStartOver="false"
        />
        <card-path
            class="border-white border-solid border-2 m-2 p-2"
            v-bind:key="`path-to-beginning`"
            v-if="currentBranch.cardOptions.length === 0"
            :appData="appData"
            :storyData="storyData"
            :branchId="storyData.cardInstances[0].id"
            :text="'Go back and try again from the beginning'"
            @emit-set-new-card-and-branch="setNewCardAndBranch(storyData.cardInstances[0].id, true)"
            :isStartOver="true"
        /> -->
    </div>
</template>

<script>
import { global } from '../mixins/global.js'
import CardHeader from './CardHeader.vue'
import CardBody from './CardBody.vue'
import CardPath from './CardPath.vue'
import RadElement from './RadElement.vue'
import { scr } from '../assets/js/scr.js'
export default {
    name: "CardFrame",
    mixins: [global],
    components: {
        CardHeader,
        CardBody,
        CardPath,
        RadElement
    },
    props: {
        branch: {
            type: Object
        },
        cardElements: {
            type: Array
        }
    },
    data() {
        return {
            currentBranch: this.branch,
            globals: {}
        }
    },
    methods: {
        sendCurrentBranchToApp() {
            this.$emit('send-current-branch-to-app', this.currentBranch)
        }
    },
    mounted() {
        scr.organizeTextly()
        if (this.storyData["scr-config"]){
            scr.branchClasses(this.storyData["scr-config"]["class-groups"])
        }
        scr.renderGifs()
        this.initializeLS('dragoni')
    },
    watch: {
        currentBranch: function () {
            this.sendCurrentBranchToApp()
        }
    },
    updated: function () {
    this.$nextTick(function () {
            scr.organizeTextly()
        if (this.storyData["scr-config"]){
            scr.branchClasses(this.storyData["scr-config"]["class-groups"])
        }            scr.renderGifs()
    })
}
}
</script>

<style>
    #card-frame {
        background-color: black;
        z-index: 1;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    #card-frame::-webkit-scrollbar { 
        display: none;
    }
</style>