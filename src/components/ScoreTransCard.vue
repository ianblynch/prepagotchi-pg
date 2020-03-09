<template>
    <div class="h-full">
        <div id="score-trans-card">
            <div v-if="storeState.prevGameData.icon" id="score-trans-icon-pair-container">
                <div id="score-trans-icon-container" class="fade-in">
                    <img id="score-trans-icon-img" :src="storeState.prevGameData.icon" />
                </div>
                <MushyText
                    id="animated-plus"
                    v-if="storeState.prevGameData.mod"
                    class="margin-centered slide-in-bottom"
                    :style="{margin:0}"
                    :heightPercent="10"
                    :widthPercent="20"
                    :text="storeState.prevGameData.mod"
                ></MushyText>
            </div>
            <MushyText
                :key="`score-text-${textIndex}`"
                class="score-text margin-centered fade-in-delay"
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
import { audio } from '../mixins/audio.js'
// data looks like this
// prevGameData: {
//     text: ['score: 30'],
//     icon: '../assets/pngs/lead-icon.png',
//     mod: '+1'
// }
export default {
    name: 'ScoreTransCard',
    mixins: [tama, audio],
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
                this.playReturnSfx()
            }
        },
        onResize() {
            this.setImageRendering()
        },
        playPlusSfx() {
            console.log('playing plus')
            this.playSfx('scoreTransPlus')
        },
        playReturnSfx() {
            this.playSfx('scoreTransReturn')
        }
    },
    mounted() {
        setTimeout(() => {
            this.canMoveOn = true
            this.setLabelText("home", "home", "home")
        }, 2000)
        setTimeout(() => {
            store.setValue('currentGameScreen', 'TamaNexus', true)
            this.playReturnSfx()
        }, 5000)
        this.onResize()
        document.querySelector('#animated-plus').addEventListener('animationstart', () => {
            this.playPlusSfx()
        })
        this.listen('resize', this.onResize)
        this.setLabelText("***", "***", "***")
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