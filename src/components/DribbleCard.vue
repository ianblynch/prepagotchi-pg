<template>
    <div 
        class="dribble-card"
        @click="e=>onClick(e)"
    >
        <div class="h-full">
            <MushyText
                class="margin-centered"
                :heightPercent="10"
                :widthPercent="100"
                :text="score"
            ></MushyText>
            <div id="moving-ball" class="zoom-animation" :style="clickableCss">
                <img id="ball" :src="ballFrame" />
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
import { audio } from '../mixins/audio.js'

const bb32 = require('../assets/pngs/basketball32.png')
const cloud1 = require('../assets/pngs/cloud-1.png')
export default {
    name: 'DribbleCard',
    mixins: [tama, audio],
    components: {},
    props: {},
    data() {
        return {
            storeState: store.state,
            score: 0,
            gameRegister: [],
            ballFrame: bb32,
            clickableGameImgSize: '150px'
        }
    },
    methods: {
        endGame() {
            let mod = '+1'
            if (this.score > 20) {
                store.setValue('reflex', this.storeState.reflex + 1 || 1, true)
                mod = '+2'
            }
            this.transitionFromGame(require('../assets/pngs/dribbling-icon.png'), mod, [
                `score: ${this.score}`,
            ])
        },
        randomPxUpTo(max, ballPx) {
            return Math.random() * (max - ballPx) + 'px'
        },
        clickedBall() {
            this.score++
            this.ballFrame = cloud1
            this.playSfx('dribbleTouchBall')
            this.storeState.dribbleTimeout = setTimeout(() => {
                this.ballFrame = bb32
                this.setNewBallPosition()
            }, 125)
        },
        missedBall() {
            this.playSfx('dribbleTouchMiss')
        },
        setNewBallPosition() {
            console.log('running set ball')
            let theBall = document.getElementById('moving-ball')
            if (theBall) {
                const ballWidth = theBall.clientWidth
                const ballHeight = theBall.clientHeight
                const dribble = this.getScreenDimensions('.dribble-card')
                theBall.style.top = this.randomPxUpTo(dribble.innerHeight, ballHeight)
                theBall.style.left = this.randomPxUpTo(dribble.innerWidth, ballWidth)
            }
        },
        onResize() {
            this.setNewBallPosition()
            this.setClickableGameImgSize()
            this.setImageRendering()
        },
        onClick(e) {
            // console.log('dribbleClick')
            // console.log(e)
            if (e.target.id === 'ball') {
                console.log('hit')
                this.clickedBall()
            } else {
                this.missedBall()
                console.log('miss')
            }
        }
    },
    mounted() {
        this.listen('resize', this.onResize)
        this.setClickableGameImgSize()
        this.setNewBallPosition()
        setTimeout(() => {
            this.endGame()
        }, 30000)
        this.setLabelText("***", "***", "***")        
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    },
    computed: {
        clickableCss() {
            return {
                height: this.clickableGameImgSize,
                width: this.clickableGameImgSize
            }
        }
    }
}
</script>

<style scoped>
#moving-ball {
    position: absolute;
    }
    #ball {
        height: 100%;
        width: 100%;
    }
</style>