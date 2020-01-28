<template>
    <div class="shoot-card">
        <div class="h-full">
            <div>
                <MushyText
                    class="margin-centered"
                    :heightPercent="10"
                    :widthPercent="100"
                    :text="`${score}/${attempts}`"
                ></MushyText>
            </div>
            <div id="shoot-card-flex-row">
                <div id="power-meter">
                    <div id="bursting-bar">
                        <img
                            id="bursting-img"
                            v-if="powerMeters[10]"
                            :src="require('../assets/pngs/bursting-bar.png')"
                        />
                    </div>
                    <div class="power-meter-inc" :class="{'filled-in-inc':powerMeters[9]}"></div>
                    <div class="power-meter-inc" :class="{'filled-in-inc':powerMeters[8]}"></div>
                    <div class="power-meter-inc" :class="{'filled-in-inc':powerMeters[7]}"></div>
                    <div class="power-meter-inc" :class="{'filled-in-inc':powerMeters[6]}"></div>
                    <div class="power-meter-inc" :class="{'filled-in-inc':powerMeters[5]}"></div>
                    <div class="power-meter-inc" :class="{'filled-in-inc':powerMeters[4]}"></div>
                    <div class="power-meter-inc" :class="{'filled-in-inc':powerMeters[3]}"></div>
                    <div class="power-meter-inc" :class="{'filled-in-inc':powerMeters[2]}"></div>
                    <div class="power-meter-inc" :class="{'filled-in-inc':powerMeters[1]}"></div>
                    <div class="power-meter-inc" :class="{'filled-in-inc':powerMeters[0]}"></div>
                </div>
                <div id="prepperoni-area">
                    <!-- <img id="prepperoni-img" :src="prepperoniImage"/> -->

                    <MushyText
                        class="margin-centered"
                        :heightPercent="10"
                        :widthPercent="50"
                        :text="resultText"
                    ></MushyText>
                    <div id="hoop-area">
                        <img id="hoop-img" :src="hoopImage" />
                        <img id="ball-img" :src="ballImage" :style="ballCSS" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'

const emptyImg = require('../assets/pngs/empty32.png'),
    basketMakeImg = require('../assets/pngs/shoot-make.png'),
    basketMissImg = require('../assets/pngs/shoot-miss.png'),
    poweringImg = require('../assets/pngs/shoot-powering.png'),
    releaseImg = require('../assets/pngs/shoot-release.png'),
    hoopImg = require('../assets/pngs/hoop-icon.png'),
    ballImg = require('../assets/pngs/basketball32.png'),
    burstingImg = require('../assets/pngs/bursting-bar.png')
const ballArrays = {
    makeLeftCSSArray: [
        { top: '10%', left: '10%' },
        { top: '37%', left: '35%' },
        { top: '81%', left: '35%' },
        { display: 'none' },
    ],
    makeRightCSSArray: [
        { top: '10%', right: '10%' },
        { top: '37%', left: '35%' },
        { top: '81%', left: '35%' },
        { display: 'none' },
    ],
    missLeftCSSArray: [
        { top: '10%', left: '10%' },
        { top: '37%', left: '15%' },
        { top: '75%', left: '5%' },
        { display: 'none' },
    ],
    missRightCSSArray: [
        { top: '10%', right: '10%' },
        { top: '37%', right: '15%' },
        { top: '75%', right: '5%' },
        { display: 'none' },
    ],
}
export default {
    name: 'ShootCard',
    mixins: [tama],
    components: {},
    props: {},
    data() {
        return {
            storeState: store.state,
            score: 0,
            attempts: 0,
            gameRegister: [],
            screenX: 0,
            screenY: 0,
            prepperoniImage: poweringImg,
            hoopImage: hoopImg,
            ballImage: emptyImg,
            resultText: 'shoot!',
            //gameState goes from 'powering' to 'shooting' to 'resulting' then back to 'powering'
            gameState: 'powering',
            powerLevel: -1,
            maxPower: 9,
            maxChance: 0.9,
            minChance: 0.1,
            ballCSS: {},
        }
    },
    methods: {
        endGame() {
            let mod = '+1'
            if (this.score > 15) {
                store.setValue('touch', this.storeState.touch + 1 || 1, true)
                mod = '+2'
            }
            this.transitionFromGame(require('../assets/pngs/hoop-icon.png'), mod, [
                `score: ${this.score}`,
            ])
        },
        shootLeftButton() {
            if (this.gameState === 'powering') {
                if (this.powerLevel < this.maxPower) {
                    this.powerLevel = this.powerLevel + 1
                    if (this.powerLevel === 0) {
                        this.prepperoniImage = poweringImg
                    }
                } else {
                    this.powerLevel = -1
                }
            }
        },
        shootCenterButton() {},
        shootRightButton() {
            this.gameState = 'shooting'
            this.prepperoniImage = releaseImg
            let powerPercent = this.powerLevel / 10 + 0.1
            let theRand = Math.random()
            console.log('theRand: ' + theRand)
            console.log('thePowerLevel: ' + powerPercent)

            let isUnderPowerLevel = theRand <= powerPercent
            let isUnderMaxChance = theRand <= this.maxChance
            console.log('isUnderPowerLevel: ' + isUnderPowerLevel)
            console.log('isUnderMaxChance: ' + isUnderMaxChance)
            this.attempts++
            if (isUnderPowerLevel && isUnderMaxChance) {
                console.log('swish!')
                this.resultText = 'swish!'
                this.ballImage = ballImg
                this.setBallCSS('make')
                this.score++
            } else {
                console.log('clank!')
                this.resultText = 'clank!'
                this.ballImage = ballImg
                this.setBallCSS('miss')
            }
            this.storeState.shootTransferTimeout = setTimeout(() => {
                this.ballImage = ballImg
                this.powerLevel = -1
                this.gameState = 'powering'
            }, 200)
        },
        setBallCSS(makeStatus) {
            let theRand = Math.random()
            let theDirection = 'Left'
            if (theRand < 0.5) {
                theDirection = 'Right'
            }
            let arrayName = `${makeStatus}${theDirection}CSSArray`
            console.log('4arrays')
            console.log(ballArrays['makeLeftCSSArray'])
            console.log(ballArrays['makeRightCSSArray'])
            console.log(ballArrays['missLeftCSSArray'])
            console.log(ballArrays['missRightCSSArray'])
            this.stepFrames('ballCSS', ballArrays[arrayName], 150)
        },
        onResize() {
            this.setImageRendering()
        }
    },
    computed: {
        powerMeters() {
            let thePowerMeters = [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ]
            for (let i = 0; i <= this.powerLevel; i++) {
                thePowerMeters[i] = true
            }
            if (this.powerLevel === this.maxPower) {
                thePowerMeters[10] = true
            }
            return thePowerMeters
        },
        burstingBar() {
            if (this.powerMeters[10]) {
                return {
                    'background-image': `url("${burstingImg}")`,
                    'background-size': 'contain',
                }
            } else return {}
        },
    },
    mounted() {
        setTimeout(() => {
            this.endGame()
        }, 30000)
        this.onResize()
        this.listen('resize', this.onResize)
        this.setLabelText("power", "***", "shoot")
    },
    watch: {
        'storeState.leftButton'() {
            console.log('left was clicked')
            this.shootLeftButton()
        },
        'storeState.centerButton'() {
            console.log('center was clicked')
            this.shootCenterButton()
        },
        'storeState.rightButton'() {
            console.log('right was clicked')
            this.shootRightButton()
        },
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    }
}
</script>

<style scoped>
.shoot-card {
    height: 100%;
}
#shoot-card-flex-row {
    display: flex;
    flex-direction: row;
    height: 93%;
}
#power-meter {
    align-self: center;
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.power-meter-inc {
    background-color: rgba(0, 0, 0, 0);
    height: 10px;
    margin: 2%;
    border: 2px black solid;
}
#bursting-bar {
    height: 14px;
}
.filled-in-inc {
    background-color: black;
}
#prepperoni-area {
    margin-left: 5%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
img {
    align-self: center;
}
#prepperoni-img {
    width: 100%;
}
#ball-img {
    width: 30%;
    position: absolute;
}
#hoop-img {
    width: 100%;
}
#hoop-area {
    width: 100%;
    position: relative;
}
#bursting-img {
    height: 100%;
    width: 100%;
}
</style>