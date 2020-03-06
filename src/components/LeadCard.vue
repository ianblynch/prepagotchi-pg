<template>
    <div class="h-full">
        <div class="lead-card">
            <MushyText
                class="margin-centered"
                :heightPercent="10"
                :widthPercent="100"
                :text="score"
            ></MushyText>
            <button class="encouragement-button" @click="clickedEncouragement(0)">
                <MushyText
                    class="margin-centered"
                    :heightPercent="10"
                    :widthPercent="100"
                    text="I believe in you!"
                ></MushyText>
            </button>
            <button class="encouragement-button" @click="clickedEncouragement(1)">
                <MushyText
                    class="margin-centered"
                    :heightPercent="10"
                    :widthPercent="100"
                    text="Let's work together!"
                ></MushyText>
            </button>
            <button class="encouragement-button" @click="clickedEncouragement(2)">
                <MushyText
                    class="margin-centered"
                    :heightPercent="10"
                    :widthPercent="100"
                    text="I got the baseline!"
                ></MushyText>
            </button>
            <button class="encouragement-button" @click="clickedEncouragement(3)">
                <MushyText
                    class="margin-centered"
                    :heightPercent="10"
                    :widthPercent="100"
                    text="I got your back!"
                ></MushyText>
            </button>
            <button class="encouragement-button" @click="clickedEncouragement(4)">
                <MushyText
                    class="margin-centered"
                    :heightPercent="10"
                    :widthPercent="100"
                    text="Come pick this guy!"
                ></MushyText>
            </button>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
import { audio } from '../mixins/audio.js'
export default {
    name: 'LeadCard',
    mixins: [tama, audio],

    props: {},
    data() {
        return {
            storeState: store.state,
            score: 0,
            gameRegister: [],
        }
    },
    methods: {
        endGame() {
            let mod = '+1'
            if (this.score > 20) {
                store.setValue('will', this.storeState.will + 1 || 1, true)
                mod = '+2'
            }
            this.transitionFromGame(require('../assets/pngs/lead-icon.png'), mod, [
                `score: ${this.score}`,
            ])
        },
        clickedEncouragement(num) {
            console.log('enc')            
            this.playSfx(`encouragement${num}`)
            this.score++
        },
        onResize() {
            this.setImageRendering()
        }
    },
    mounted() {
        setTimeout(() => {
            this.endGame()
        }, 30000)
        this.onResize()
        this.listen('resize', this.onResize)
        this.setLabelText("***", "***", "***")
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    }
}
</script>

<style scoped>
.encouragement-button {
    display: block;
}
</style>