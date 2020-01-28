<template>
    <div class="h-full">
        <div id="grave-screen">
            <div id="grave-img-container">
                <img :src="graveFrame" id="grave-img" />
                <div id="rip-div">
                    <MushyText
                        class="margin-centered"
                        :heightPercent="25"
                        :widthPercent="50"
                        text="R.I.P."
                    ></MushyText>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'

export default {
    name: 'GraveScreen',
    mixins: [tama],
    data() {
        return {
            storeState: store.state,
            graveFrame: require('../assets/pngs/grave.png'),
            graveText: '',
        }
    },
    methods: {
        moveOn() {
            Promise.resolve()
                .then(() => {
                    this.setupNewEgg()
                })
                .then(() => {
                    store.setValue('currentGameScreen', 'EggCard', true)
                })
        },
        setupNewEgg() {
            console.log('setup')
            store.setValue('resetting', true)
            store.setValue('prepperoniDevelopmentStatus', 'egg')
            store.setValue('classicBallInitialShows', [false, false, false, false, false, false, false, false, false, false, false, false])
            store.setValue('belly', 3)
            store.setValue('brain', 3)
            store.setValue('muscle', 3)
            store.setValue('reflex', 3)
            store.setValue('stamina', 3)
            store.setValue('touch', 3)
            store.setValue('will', 3)
            store.setValue('hasAnimatedHatch', false)
            store.setValue('hatchTimer', '', true)
            store.setValue('resetting', false)
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
        this.setLabelText("***", "***", "***")
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    }
}
</script>

<style scoped>
</style>