<template>
    <div class="h-full">
        <div id="socialize-card">
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
const highHand = require('../assets/pngs/socialize-two-hands-up.png')
const leftHand = require('../assets/pngs/socialize-left-hand.png')
const rightHand = require('../assets/pngs/socialize-right-hand.png')
const lowHand = require('../assets/pngs/socialize-two-hands-down.png')
const psns0 = require('../assets/pngs/psns-0.png')
const highFiveHigh = require('../assets/pngs/high-five-high.png')
const highFiveRight = require('../assets/pngs/high-five-right.png')
const highFiveLow = require('../assets/pngs/high-five-low.png')
const highFiveLeft = require('../assets/pngs/high-five-left.png')
const socializeAnimArrays = {
    highFrameWin: [cloud0, checkStart, checkMid, checkFinish, highHand],
    highFrameLose: [cloud0, xStart, xMid, xFinish, highHand],
    leftFrameWin: [cloud0, checkStart, checkMid, checkFinish, leftHand],
    leftFrameLose: [cloud0, xStart, xMid, xFinish, leftHand],
    rightFrameWin: [cloud0, checkStart, checkMid, checkFinish, rightHand],
    rightFrameLose: [cloud0, xStart, xMid, xFinish, rightHand],
    lowFrameWin: [cloud0, checkStart, checkMid, checkFinish, lowHand],
    lowFrameLose: [cloud0, xStart, xMid, xFinish, lowHand],
    highPrepperoni: [highFiveHigh, psns0],
    rightPrepperoni: [highFiveRight, psns0],
    lowPrepperoni: [highFiveLow, psns0],
    leftPrepperoni: [highFiveLeft, psns0],
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
            leftFrame: leftHand,
            rightFrame: rightHand,
            highFrame: highHand,
            lowFrame: lowHand,
            prepperoniFrame: psns0,
            resSquareCss: {},
            screenX: 0,
            responsiveImg: {},
            correctInARow: 0,
        }
    },
    methods: {
        endGame() {
            let mod = '+1'
            if (this.score > 15) {
                store.setValue('muscle', this.storeState.muscle + 1 || 1, true)
                mod = '+2'
            }
            this.transitionFromGame(require('../assets/pngs/socialize-icon.png'), mod, [
                `score: ${this.score}`,
            ])
        },
        clickedTarget(target) {
            let offLimits = target
            let frameName = `${target}Frame`
            this.stepFrames(
                'prepperoniFrame',
                socializeAnimArrays[`${target}Prepperoni`],
                500
            )
            if (target === this.currentTarget) {
                this.score++
                this.correctInARow++
                if (this.correctInARow === 1) {
                    this.playSfx('socializeOneCorrect')
                } else if (this.correctInARow === 2) {
                    this.playSfx('socializeTwoCorrect')
                } else {
                    this.playSfx('socializeThreeCorrect')
                }
                this.stepFrames(
                    frameName,
                    socializeAnimArrays[`${frameName}Win`],
                    150
                )
            } else {
                this.playSfx('socializeMiss')
                this.stepFrames(
                    frameName,
                    socializeAnimArrays[`${frameName}Lose`],
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
                    newPrompt = 'Up High!'
                } else if (rand < 0.5) {
                    newTarget = 'left'
                    newPrompt = 'Left Side!'
                } else if (rand < 0.75) {
                    newTarget = 'right'
                    newPrompt = 'Right On!'
                } else {
                    newTarget = 'low'
                    newPrompt = 'Down Low!'
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
            this.responsiveImg = {
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
        this.listen('resize', this.onResize)
        this.changeTarget('')
        setTimeout(() => {
            this.endGame()
        }, 30000)
        this.setLabelText("***", "***", "***")
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    },
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