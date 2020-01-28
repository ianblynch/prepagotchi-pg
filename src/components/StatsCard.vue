<template>
    <div class="h-full">
        <div id="stats-card">
            <div
                :key="`stat-${statName}`"
                v-for="(stat, statName) in statImgArrays"
                class="stat-container"
            >
                <MushyText
                    class="margin-centered stat-label-div"
                    :heightPercent="7"
                    :widthPercent="100"
                    :text="statName"
                ></MushyText>
                <div class="stats-icon-div">
                    <div
                        :key="`${statName}-img-${imgIndex}`"
                        v-for="(img, imgIndex) in stat"
                        class="stats-img-container"
                    >
                        <img class="stats-img" :src="img" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
const aspects = [
    'belly',
    'brain',
    'muscle',
    'reflex',
    'stamina',
    'touch',
    'will',
]
const empty32 = require('../assets/pngs/empty32.png')

const icons = {
    belly: {
        full: require('../assets/pngs/steak-icon.png'),
        half: require('../assets/pngs/steak-icon-half.png'),
        dimmed: require('../assets/pngs/steak-icon-dimmed.png'),
    },
    brain: {
        full: require('../assets/pngs/socialize-icon.png'),
        half: require('../assets/pngs/socialize-icon-half.png'),
        dimmed: require('../assets/pngs/socialize-icon-dimmed.png'),
    },
    muscle: {
        full: require('../assets/pngs/lift-icon.png'),
        half: require('../assets/pngs/lift-icon-half.png'),
        dimmed: require('../assets/pngs/lift-icon-dimmed.png'),
    },
    reflex: {
        full: require('../assets/pngs/dribbling-icon.png'),
        half: require('../assets/pngs/dribbling-icon-half.png'),
        dimmed: require('../assets/pngs/dribbling-icon-dimmed.png'),
    },
    stamina: {
        full: require('../assets/pngs/powersns-icon.png'),
        half: require('../assets/pngs/powersns-icon-half.png'),
        dimmed: require('../assets/pngs/powersns-icon-dimmed.png'),
    },
    touch: {
        full: require('../assets/pngs/hoop-icon.png'),
        half: require('../assets/pngs/hoop-icon-half.png'),
        dimmed: require('../assets/pngs/hoop-icon-dimmed.png'),
    },
    will: {
        full: require('../assets/pngs/lead-icon.png'),
        half: require('../assets/pngs/lead-icon-half.png'),
        dimmed: require('../assets/pngs/lead-icon-dimmed.png'),
    },
}
export default {
    name: 'StatsCard',
    mixins: [tama],
    components: {},
    props: {},
    data() {
        return {
            storeState: store.state,
            score: 0,
            gameRegister: [],
            screenX: 0,
            screenY: 0,
        }
    },
    methods: {
        endGame() {
            store.setValue('currentGameScreen', 'TamaNexus', true)
        },
        statsLeftButton() {
            this.endGame()
        },
        statsCenterButton() {
            this.endGame()
        },
        statsRightButton() {
            // this.endGame()
            store.setValue('currentGameScreen', 'ClassicBall')
        },
        onResize() {
            this.setImageRendering()
        }
    },
    computed: {
        statImgArrays() {
            let theObject = {}
            aspects.forEach(aspect => {
                const full = icons[aspect].full
                const half = icons[aspect].half
                const dimmed = icons[aspect].dimmed
                let aspectArray
                const val = this.storeState[`net${aspect}`]

                if (val < 0) {
                    aspectArray = [dimmed, dimmed, dimmed]
                } else if (val < 2) {
                    aspectArray = [half, dimmed, dimmed]
                } else if (val < 4) {
                    aspectArray = [full, dimmed, dimmed]
                } else if (val < 6) {
                    aspectArray = [full, half, dimmed]
                } else if (val < 8) {
                    aspectArray = [full, full, dimmed]
                } else if (val < 10) {
                    aspectArray = [full, full, half]
                } else if (val >= 10) {
                    aspectArray = [full, full, full]
                }
                theObject[aspect] = aspectArray
            })
            return theObject
        },
    },
    watch: {
        'storeState.leftButton'() {
            console.log('left was clicked')
            this.statsLeftButton()
        },
        'storeState.centerButton'() {
            console.log('center was clicked')
            this.statsCenterButton()
        },
        'storeState.rightButton'() {
            console.log('right was clicked')
            this.statsRightButton()
        },
    },
    mounted() {
        this.onResize()
        this.listen('resize', this.onResize)
        this.setLabelText("home", "home", "cwb")
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    }
}
</script>

<style scoped>

img {
    display: inline-block;
}
</style>