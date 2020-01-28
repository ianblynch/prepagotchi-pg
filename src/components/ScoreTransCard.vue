<template>
    <div class="h-full">
        <div id="score-trans-card">
            <div v-if="storeState.prevGameData.icon" id="score-trans-icon-pair-container">
                <div id="score-trans-icon-container">
                    <img id="score-trans-icon-img" :src="storeState.prevGameData.icon" />
                </div>
                <MushyText
                    v-if="storeState.prevGameData.mod"
                    class="margin-centered"
                    :style="{margin:0}"
                    :heightPercent="10"
                    :widthPercent="20"
                    :text="storeState.prevGameData.mod"
                ></MushyText>
            </div>
            <MushyText
                :key="`score-text-${textIndex}`"
                class="score-text margin-centered"
                v-for="(text, textIndex) in storeState.prevGameData.text"
                :heightPercent="10"
                :widthPercent="100"
                :text="text"
            ></MushyText>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
// data looks like this
// prevGameData: {
//     text: ['score: 30'],
//     icon: '../assets/pngs/lead-icon.png',
//     mod: '+1'
// }
export default {
    name: 'ScoreTransCard',
    mixins: [tama],
    data() {
        return {
            storeState: store.state,
            canMoveOn: false,
        }
    },
    methods: {
        moveOn() {
            if (this.canMoveOn) {
                store.setValue('currentGameScreen', 'TamaNexus', true)
            }
        },
        onResize() {
            this.setImageRendering()
        },
    },
    mounted() {
        setTimeout(() => {
            this.canMoveOn = true
        }, 2000)
        setTimeout(() => {
            store.setValue('currentGameScreen', 'TamaNexus', true)
        }, 5000)
        this.onResize()
        this.listen('resize', this.onResize)
        this.setLabelText("home", "home", "home")
    },
    watch: {
        'storeState.leftButton'() {
            console.log('left was clicked')
            this.moveOn()
        },
        'storeState.centerButton'() {
            console.log('center was clicked')
            this.moveOn()
        },
        'storeState.rightButton'() {
            console.log('right was clicked')
            this.moveOn()
        },
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    },
}
</script>

<style scoped>
</style>