<template>
    <div>
        <div class="power-start-and-stop-card centered-frame">
            <div class="centered-guy">
                <img class="w-full" :src="psnsCurrentFrame" />
            </div>
            <MushyText
                class="margin-centered"
                :heightPercent="10"
                :widthPercent="100"
                :text="score"
            ></MushyText>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
import { audio } from '../mixins/audio.js'

const psns0 = require('../assets/pngs/psns-0.png')
const psns1 = require('../assets/pngs/psns-1.png')
const psns2 = require('../assets/pngs/psns-2.png')
const psns3 = require('../assets/pngs/psns-3.png')

export default {
    name: 'PowerStartAndStopCard',
    mixins: [tama, audio],
    components: {},
    props: {},
    data() {
        return {
            storeState: store.state,
            score: 0,
            gameRegister: [],
            psnsCurrentFrame: psns0,
        }
    },
    methods: {
        endGame() {
            let mod = '+1'
            if (this.score > 10) {
                store.setValue(
                    'stamina',
                    this.storeState.stamina + 1 || 1,
                    true
                )
                mod = '+2'
            }
            this.transitionFromGame(require('../assets/pngs/powersns-icon.png'), mod, [
                `score: ${this.score}`,
            ])
        },
        clickedPush() {
            this.animatePush()
            console.log('push')
            this.gameRegister.push('push')
            this.checkForScore()
        },
        clickedStop() {
            this.animateStop()
            console.log('stop')
            this.gameRegister.push('stop')
            this.checkForScore()
        },
        checkForScore() {
            console.log(this.gameRegister)
            if (this.gameRegister[this.gameRegister.length - 1]) {
                console.log('-1')
                console.log(this.gameRegister[this.gameRegister.length - 1])
            }
            if (this.gameRegister[this.gameRegister.length - 2]) {
                console.log('-2')
                console.log(this.gameRegister[this.gameRegister.length - 2])
            }
            if (this.gameRegister[this.gameRegister.length - 3]) {
                console.log('-3')
                console.log(this.gameRegister[this.gameRegister.length - 3])
            }
            if (
                this.gameRegister[this.gameRegister.length - 3] === 'push' &&
                this.gameRegister[this.gameRegister.length - 2] === 'push' &&
                this.gameRegister[this.gameRegister.length - 1] === 'stop'
            ) {
                console.log('score')
                this.score++
            }
        },
        animatePush() {
            this.stepFrames(
                'psnsCurrentFrame',
                [psns1, psns2, psns3, psns0],
                130
            )
        },
        animateStop() {
            this.stepFrames('psnsCurrentFrame', [psns2], 130)
        },
        onResize() {
            this.setImageRendering()
        },
    },
    watch: {
        'storeState.leftButton'() {
            console.log('left was clicked')
            this.clickedPush()
        },
        'storeState.centerButton'() {
            console.log('center was clicked')
        },
        'storeState.rightButton'() {
            console.log('right was clicked')
            this.clickedStop()
        },
    },
    mounted() {
        setTimeout(() => {
            this.endGame()
        }, 30000)
        this.onResize()
        this.listen('resize', this.onResize)
        this.setLabelText("push", "***", "stop")
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    },
}
</script>

<style scoped>
</style>