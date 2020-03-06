<template>
    <div class="h-full">
        <div id="lift-card">
            <MushyText
                class="margin-centered"
                :heightPercent="10"
                :widthPercent="100"
                :text="score"
            ></MushyText>
            <div class="grid-container" :style="[resSquareCss]">
                <div class="grid-cell"></div>
                <div class="grid-cell" @click="clickedTarget('high')">
                    <img :src="highFrame" :style="responsiveImg" />
                </div>
                <div class="grid-cell"></div>
                <div class="grid-cell" @click="clickedTarget('left')">
                    <img :src="leftFrame" :style="responsiveImg" />
                </div>
                <div class="grid-cell">
                    <img id="prepperoni-img" :src="prepperoniFrame" />
                </div>
                <div class="grid-cell" @click="clickedTarget('right')">
                    <img :src="rightFrame" :style="responsiveImg" />
                </div>
                <div class="grid-cell"></div>
                <div class="grid-cell" @click="clickedTarget('low')">
                    <img :src="lowFrame" :style="responsiveImg" />
                </div>
                <div class="grid-cell"></div>
            </div>
            <MushyText
                class="margin-centered"
                :heightPercent="10"
                :widthPercent="100"
                :text="currentPromptText"
            ></MushyText>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
import { audio } from '../mixins/audio.js'
const cloud0 = require('../assets/pngs/cloud-0.png')
const cloud1 = require('../assets/pngs/cloud-1.png')
const cloud2 = require('../assets/pngs/cloud-2.png')
const checkStart = require('../assets/pngs/check-start.png')
const checkMid = require('../assets/pngs/check-mid.png')
const checkFinish = require('../assets/pngs/check-finish.png')
const xStart = require('../assets/pngs/x-start.png')
const xMid = require('../assets/pngs/x-mid.png')
const xFinish = require('../assets/pngs/x-finish.png')
const pullupIcon = require('../assets/pngs/pullup-icon.png')
const leftDumbbellIcon = require('../assets/pngs/dumbbell-icon.png')
const rightDumbbellIcon = require('../assets/pngs/dumbbell-icon.png')
const dipIcon = require('../assets/pngs/dip-icon.png')
const psns0 = require('../assets/pngs/psns-0.png')
const leftCurl0 = require('../assets/pngs/left-curl-0.png')
const leftCurl1 = require('../assets/pngs/left-curl-1.png')
const rightCurl0 = require('../assets/pngs/right-curl-0.png')
const rightCurl1 = require('../assets/pngs/right-curl-1.png')
const pullup0 = require('../assets/pngs/pullup-0.png')
const pullup1 = require('../assets/pngs/pullup-1.png')
const dip0 = require('../assets/pngs/dip-0.png')
const dip1 = require('../assets/pngs/dip-1.png')
const liftAnimArrays = {
    highFrameWin: [cloud0, checkStart, checkMid, checkFinish, pullupIcon],
    highFrameLose: [cloud0, xStart, xMid, xFinish, pullupIcon],
    leftFrameWin: [cloud0, checkStart, checkMid, checkFinish, leftDumbbellIcon],
    leftFrameLose: [cloud0, xStart, xMid, xFinish, leftDumbbellIcon],
    rightFrameWin: [
        cloud0,
        checkStart,
        checkMid,
        checkFinish,
        rightDumbbellIcon,
    ],
    rightFrameLose: [cloud0, xStart, xMid, xFinish, rightDumbbellIcon],
    lowFrameWin: [cloud0, checkStart, checkMid, checkFinish, dipIcon],
    lowFrameLose: [cloud0, xStart, xMid, xFinish, dipIcon],
    highPrepperoni: [pullup0, pullup1, psns0],
    rightPrepperoni: [rightCurl0, rightCurl1, psns0],
    lowPrepperoni: [dip0, dip1, psns0],
    leftPrepperoni: [leftCurl0, leftCurl1, psns0],
}
export default {
    name: 'LiftCard',
    mixins: [tama, audio],
    components: {},
    props: {},
    data() {
        return {
            storeState: store.state,
            score: 0,
            gameRegister: [],
            currentTarget: '',
            currentPromptText: '',
            leftFrame: leftDumbbellIcon,
            rightFrame: rightDumbbellIcon,
            highFrame: pullupIcon,
            lowFrame: dipIcon,
            prepperoniFrame: psns0,
            resSquareCss: {},
            screenX: 0,
            responsiveImg: {}
        }
    },
    methods: {
        endGame() {
            let mod = '+1'
            if (this.score > 15) {
                store.setValue('muscle', this.storeState.muscle + 1 || 1, true)
                mod = '+2'
            }
            this.transitionFromGame(require('../assets/pngs/lift-icon.png'), mod, [
                `score: ${this.score}`,
            ])
        },
        clickedTarget(target) {
            let offLimits = target
            let frameName = `${target}Frame`
            this.stepFrames(
                'prepperoniFrame',
                liftAnimArrays[`${target}Prepperoni`],
                500
            )
            if (target === this.currentTarget) {
                this.score++
                this.stepFrames(
                    frameName,
                    liftAnimArrays[`${frameName}Win`],
                    150
                )
            } else {
                this.stepFrames(
                    frameName,
                    liftAnimArrays[`${frameName}Lose`],
                    150
                )
            }
            this.changeTarget(offLimits)
        },
        changeTarget(offLimits) {
            let newTarget = ''
            let newPrompt = ''
            let rand
            const rollNewTarget = () => {
                rand = Math.random()
                if (rand < 0.25) {
                    newTarget = 'high'
                    newPrompt = 'Pullup!'
                } else if (rand < 0.5) {
                    newTarget = 'left'
                    newPrompt = 'Left Curl!'
                } else if (rand < 0.75) {
                    newTarget = 'right'
                    newPrompt = 'Right Curl!'
                } else {
                    newTarget = 'low'
                    newPrompt = 'Dip!'
                }
            }
            const checkForIsNewVal = val => {
                if (val !== offLimits) {
                    this.currentTarget = newTarget
                    this.currentPromptText = newPrompt
                } else {
                    rollNewTarget()
                    return checkForIsNewVal(newTarget)
                }
            }
            rollNewTarget()
            checkForIsNewVal(newTarget)
        },
        setResSquareCss() {
            let square = {}
            let isd = this.getInsetScreenDimensions()
            if (isd.innerWidth > isd.innerHeight) {
                //set so it will fit isd.innerHeight
                square.width = isd.innerHeight + 'px'
                square.height = isd.innerHeight + 'px'
                this.squareX = isd.innerHeight
            } else {
                //set so it will fit isd.innerWidth
                square.width = isd.innerWidth + 'px'
                square.height = isd.innerWidth + 'px'
                this.squareX = isd.innerWidth
            }
            //
            let fourth = (parseInt(square.width) - 4) / 4
            let gridString = `${fourth}px ${fourth * 2}px ${fourth}px`
            square['grid-template-columns'] = gridString
            square['grid-template-rows'] = gridString
            this.resSquareCss = square
        },
        setResponsiveImg() {
            const insetWidth = this.getInsetScreenDimensions().innerWidth
            let thePixels = insetWidth / 4 - 4 + 'px'
            this.responsiveImg =  {
                height: thePixels,
                width: thePixels,
            }
        },
        onResize() {
            this.setResSquareCss()
            this.setResponsiveImg()
            this.setImageRendering()
        },
    },

    mounted() {
        this.onResize()
        this.changeTarget('')
        setTimeout(() => {
            this.endGame()
        }, 30000)
        this.listen('resize', this.onResize)
        this.setLabelText("***", "***", "***")
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    }
}
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 2fr 1fr;
    grid-gap: 2px;
    padding: 0;
}
.grid-cell {
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 1rem;
}
img {
    align-self: center;
}
#prepperoni-img {
    width: 100%;
    height: 100%;
}
</style>