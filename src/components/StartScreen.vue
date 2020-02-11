<template>
    <div id="start-screen">
        <div class="h-full">
            <MushyText
                class="margin-centered"
                :heightPercent="10"
                :widthPercent="100"
                text="prepagotchi"
            ></MushyText>
            <div id="start-icon">
                <img id="start-icon-img" :src="startIconFrame" />
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
import { audio } from '../mixins/audio.js'

const broccoliIcon = require('../assets/pngs/broccoli.png')
export default {
    name: 'StartScreen',
    mixins: [tama, audio],
    data() {
        return {
            storeState: store.state,
            startIconFrame: broccoliIcon
        }
    },
    methods: {
        moveOn() {
            // this.play('amore')
                this.stop(
                    'amore',
                    () => {
                        console.log('song stopped successfully')
                    },
                    err => {
                        console.log(err)
                    }
                )
            let theStatus = this.storeState.prepperoniDevelopmentStatus
            if (theStatus === 'egg') {
                store.setValue('currentGameScreen', 'EggCard', true)
            } else if (theStatus === 'alive') {
                store.setValue('currentGameScreen', 'TamaNexus', true)
            }

            // store.setValue('currentGameScreen', 'GraveScreen', true)

            // this.transitionFromGame(require('../assets/pngs/powersns-icon.png'), '+1', [`score: 1`])
        },
        onResize() {
            this.setImageRendering()
        }
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
    mounted() {
        this.onResize()
        this.listen('resize', this.onResize)
        this.setLabelText("start", "start", "start")
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    }
}
</script>

<style scoped>
</style>