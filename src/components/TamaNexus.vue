<template>
    <div>
        <div class="tama-nexus">
            <div class="vert-flex-container">
                <div class="horiz-flex-container" id="top-row">
                    <div class="option-button">
                        <img
                            :class="{'is-highlighted-class': isSelected.dribbling}"
                            class="icon"
                            :src="require('../assets/pngs/dribbling-icon.png')"
                        />
                    </div>

                    <div class="option-button">
                        <img
                            :class="{'is-highlighted-class': isSelected.lead}"
                            class="icon"
                            :src="require('../assets/pngs/lead-icon.png')"
                        />
                    </div>

                    <div class="option-button">
                        <img
                            :class="{'is-highlighted-class': isSelected.powerStartAndStop}"
                            class="icon"
                            :src="require('../assets/pngs/powersns-icon.png')"
                        />
                    </div>

                    <div class="option-button">
                        <img
                            :class="{'is-highlighted-class': isSelected.socialize}"
                            class="icon"
                            :src="require('../assets/pngs/socialize-icon.png')"
                        />
                    </div>
                </div>
                <div id="middle-content">
                    <div id="big-icon" v-if="storeState.transitioningToGame">
                        <img id="big-icon-img" :src="bigIconFrame" />
                    </div>
                    <template v-else>
                        <button class="nexus-temp-button" @click="wipeLS()">
                            <MushyText
                                class="margin-centered"
                                :heightPercent="5"
                                :widthPercent="50"
                                text="clear LS"
                            ></MushyText>
                        </button>
                        <button class="nexus-temp-button" @click="loadAmore()">
                            <MushyText
                                class="margin-centered"
                                :heightPercent="10"
                                :widthPercent="50"
                                text="load amore"
                            ></MushyText>
                        </button>
                        <button class="nexus-temp-button" @click="playAmore()">
                            <MushyText
                                class="margin-centered"
                                :heightPercent="10"
                                :widthPercent="50"
                                text="play amore"
                            ></MushyText>
                        </button>
                        <button class="nexus-temp-button" @click="stopAmore()">
                            <MushyText
                                class="margin-centered"
                                :heightPercent="10"
                                :widthPercent="50"
                                text="stop amore"
                            ></MushyText>
                        </button>
                        <button class="nexus-temp-button" @click="unloadAmore()">
                            <MushyText
                                class="margin-centered"
                                :heightPercent="5"
                                :widthPercent="50"
                                text="unload amore"
                            ></MushyText>
                        </button>
                        <div class="prepperoni-box">
                            <img
                                id="prepperoni-img"
                                :src="prepperoniFrame"
                                :style="prepperoniMargins"
                            />
                        </div>
                    </template>
                </div>
                <div class="horiz-flex-container" id="bottom-row">
                    <div class="option-button">
                        <img
                            :class="{'is-highlighted-class': isSelected.eat}"
                            class="icon"
                            :src="require('../assets/pngs/steak-icon.png')"
                        />
                    </div>
                    <div class="option-button">
                        <img
                            :class="{'is-highlighted-class': isSelected.shoot}"
                            class="icon"
                            :src="require('../assets/pngs/hoop-icon.png')"
                        />
                    </div>
                    <div class="option-button">
                        <img
                            :class="{'is-highlighted-class': isSelected.lift}"
                            class="icon"
                            :src="require('../assets/pngs/lift-icon.png')"
                        />
                    </div>
                    <div class="option-button">
                        <img
                            :class="{'is-highlighted-class': isSelected.stats}"
                            class="icon"
                            :src="require('../assets/pngs/stats-icon.png')"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
import { audio } from '../mixins/audio.js'
const dribblingIcon = require('../assets/pngs/dribbling-icon.png')
const leadIcon = require('../assets/pngs/lead-icon.png')
const psnsIcon = require('../assets/pngs/powersns-icon.png')
const socializeIcon = require('../assets/pngs/socialize-icon.png')
const eatIcon = require('../assets/pngs/steak-icon.png')
const shootIcon = require('../assets/pngs/hoop-icon.png')
const liftIcon = require('../assets/pngs/lift-icon.png')
const statsIcon = require('../assets/pngs/stats-icon.png')
const empty32 = require('../assets/pngs/empty32.png')
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
const actionsArray = [
    'dribbling',
    'lead',
    'powerStartAndStop',
    'socialize',
    'eat',
    'shoot',
    'lift',
    'stats',
]

export default {
    name: 'TamaNexus',
    mixins: [tama, audio],
    components: {},
    data() {
        return {
            selected: 0,
            storeState: store.state,
            prepperoniFrame: require('../assets/pngs/high-five-high.png'),
            prepperoniTopMargin: '25%',
            prepperoniLeftMargin: '25%',
            classicBallInterval: '',
            bigIconFrame: '',
            prepperoniTransformScaleX: 1
        }
    },
    props: {},
    methods: {
        setDaysAlive() {
            let days
            const oneDayMS = 86400000
            const threeDays = oneDayMS * 3
            //get time now
            let now = new Date().getTime()
            let hatchTime = this.storeState.hatchTimer
            let diffMS = now - hatchTime
            days = Math.floor(diffMS / oneDayMS)
            store.setValue('daysAlive', days, true)
        },
        updateClassicBallUnlockedPages() {
            if (this.storeState.prepperoniDevelopmentStatus === 'alive') {
                this.setDaysAlive()
                const initials = this.storeState.classicBallInitialShows
                const days = this.storeState.daysAlive
                //go through and check if index *7 (except for 0, set that to 1 * 7) > storeState.daysAlive
                let newUnlocked = initials.map((page, pageIndex) => {
                    let bool = false
                    let target = pageIndex * 7 - 1
                    if (pageIndex === 0 && days > 6) {
                        bool = true
                    } else if (pageIndex > 0 && days > target) {
                        bool = true
                    }
                    return bool
                })
                store.setValue('classicBallUnlockedPages', newUnlocked, true)
                let toShowQueue = []
                newUnlocked.forEach((page, pageIndex) => {
                    if (page && !initials[pageIndex]) {
                        toShowQueue.push(pageIndex)
                    }
                })
                // toShowQueue = [1,2,3] //delete this line to make normal again
                store.setValue('classicBallQueue', toShowQueue)
                if (toShowQueue.length > 0) {
                    //transfer to ClassicBall.vue
                    //logic in ClassicBall.vue will process queue
                    store.setValue('currentGameScreen', 'ClassicBall')
                }
            }
        },
        movePrepperoniIncrementally() {
            clearTimeout(this.storeState.movingTimeout)
            let currentTop = parseInt(this.prepperoniTopMargin)
            let currentLeft = parseInt(this.prepperoniLeftMargin)
            const maxTop = 50
            const minTop = 0
            const maxLeft = 50
            const minLeft = 0
            const inc = 5
            let topRand = Math.random()
            let leftRand = Math.random()
            const oneOfThree = (current, rand, min, max, horiz) => {
                let thePercent
                if (rand <= 0.33 && current - inc >= min) {
                    thePercent = current - inc
                    if (horiz) {
                        this.prepperoniTransformScaleX = -1
                    }
                } else if (rand <= 0.67 && current + inc <= max) {
                    thePercent = current + inc
                    if (horiz) {
                        this.prepperoniTransformScaleX = 1
                    }
                } else {
                    thePercent = current
                }
                return thePercent + '%'
            }
            let newTop = oneOfThree(currentTop, topRand, minTop, maxTop)
            let newLeft = oneOfThree(
                currentLeft,
                leftRand,
                minLeft,
                maxLeft,
                true
            )
            this.prepperoniTopMargin = newTop
            this.prepperoniLeftMargin = newLeft
            if (
                !this.storeState.isIdleAnimationRunning &&
                Math.random() < 0.4
            ) {
                this.runIdleAnimation('TamaNexus')
            }
            this.storeState.movingTimeout = setTimeout(() => {
                return this.movePrepperoniIncrementally()
            }, 3000)
        },
        moveCursorLeft() {
            if (this.selected === 0) {
                this.selected = this.selected + (actionsArray.length - 1)
            } else {
                this.selected = this.selected - 1
            }
        },
        makeTransitionFrames(frame) {
            return [frame, empty32, frame, empty32, frame]
        },
        makeTransitionSpeeds() {
            return [300, 150, 300, 150, 750]
        },
        pressSelect() {
            let select = actionsArray[this.selected % actionsArray.length]
            switch (select) {
                case 'dribbling':
                    store.setValue('transitioningToGame', true)
                    this.stepFrames(
                        'bigIconFrame',
                        this.makeTransitionFrames(dribblingIcon),
                        this.makeTransitionSpeeds(),
                        0,
                        () => {
                            store.setValue('currentGameScreen', 'DribbleCard')
                            store.setValue(
                                'reflex',
                                this.storeState.reflex + 1 || 1,
                                true
                            )
                            store.setValue('transitioningToGame', false)
                        }
                    )
                    break
                case 'lead':
                    store.setValue('transitioningToGame', true)
                    this.stepFrames(
                        'bigIconFrame',
                        this.makeTransitionFrames(leadIcon),
                        this.makeTransitionSpeeds(),
                        0,
                        () => {
                            store.setValue('currentGameScreen', 'LeadCard')
                            store.setValue(
                                'will',
                                this.storeState.will + 1 || 1,
                                true
                            )
                            store.setValue('transitioningToGame', false)
                        }
                    )
                    break
                case 'powerStartAndStop':
                    store.setValue('transitioningToGame', true)
                    this.stepFrames(
                        'bigIconFrame',
                        this.makeTransitionFrames(psnsIcon),
                        this.makeTransitionSpeeds(),
                        0,
                        () => {
                            store.setValue(
                                'currentGameScreen',
                                'PowerStartAndStopCard'
                            )
                            store.setValue(
                                'stamina',
                                this.storeState.stamina + 1 || 1,
                                true
                            )
                            store.setValue('transitioningToGame', false)
                        }
                    )
                    break
                case 'socialize':
                    store.setValue('transitioningToGame', true)
                    this.stepFrames(
                        'bigIconFrame',
                        this.makeTransitionFrames(socializeIcon),
                        this.makeTransitionSpeeds(),
                        0,
                        () => {
                            store.setValue('currentGameScreen', 'SocializeCard')
                            store.setValue(
                                'brain',
                                this.storeState.brain + 1 || 1,
                                true
                            )
                            store.setValue('transitioningToGame', false)
                        }
                    )
                    break
                case 'eat':
                    store.setValue('transitioningToGame', true)
                    this.stepFrames(
                        'bigIconFrame',
                        this.makeTransitionFrames(eatIcon),
                        this.makeTransitionSpeeds(),
                        0,
                        () => {
                            store.setValue('currentGameScreen', 'EatCard')
                            store.setValue(
                                'belly',
                                this.storeState.belly + 1 || 1,
                                true
                            )
                            store.setValue('transitioningToGame', false)
                        }
                    )
                    break
                case 'shoot':
                    store.setValue('transitioningToGame', true)
                    this.stepFrames(
                        'bigIconFrame',
                        this.makeTransitionFrames(shootIcon),
                        this.makeTransitionSpeeds(),
                        0,
                        () => {
                            store.setValue('currentGameScreen', 'ShootCard')
                            store.setValue(
                                'touch',
                                this.storeState.touch + 1 || 1,
                                true
                            )
                            store.setValue('transitioningToGame', false)
                        }
                    )
                    break
                case 'lift':
                    store.setValue('transitioningToGame', true)
                    this.stepFrames(
                        'bigIconFrame',
                        this.makeTransitionFrames(liftIcon),
                        this.makeTransitionSpeeds(),
                        0,
                        () => {
                            store.setValue('currentGameScreen', 'LiftCard')
                            store.setValue(
                                'muscle',
                                this.storeState.muscle + 1 || 1,
                                true
                            )
                            store.setValue('transitioningToGame', false)
                        }
                    )
                    break
                case 'stats':
                    store.setValue('transitioningToGame', true)
                    this.stepFrames(
                        'bigIconFrame',
                        this.makeTransitionFrames(statsIcon),
                        this.makeTransitionSpeeds(),
                        0,
                        () => {
                            store.setValue('currentGameScreen', 'StatsCard')
                            store.setValue('transitioningToGame', false)
                        }
                    )
                    break
                default:
                    break
            }
        },
        moveCursorRight() {
            if (this.selected === actionsArray.length - 1) {
                this.selected = 0
            } else {
                this.selected = this.selected + 1
            }
        },
        wipeLS() {
            store.clearLS()
        },
        koPos() {
            store.setValue('belly', this.storeState.belly - 1)
            store.setValue('brain', this.storeState.brain - 1)
            store.setValue('muscle', this.storeState.muscle - 1)
            store.setValue('reflex', this.storeState.reflex - 1)
            store.setValue('stamina', this.storeState.stamina - 1)
            store.setValue('touch', this.storeState.touch - 1)
            store.setValue('will', this.storeState.will - 1)
        },
        koNeg() {
            store.setValue('belly', this.storeState.belly - 1)
            store.setValue('brain', this.storeState.brain - 1)
            store.setValue('muscle', this.storeState.muscle - 1)
            store.setValue('reflex', this.storeState.reflex - 1)
            // store.setValue('stamina', this.storeState.stamina-1)
            // store.setValue('touch', this.storeState.touch-1)
            // store.setValue('will', this.storeState.will-1)
        },
        onResize() {
            this.setImageRendering()
        },
        loadAmore() {
            this.loadSong('amore','audio/Prep AMORE2.mp3', .03, 1, 0)


        },
        playAmore() {
            this.play('amore',
                () => {
                    console.log('song played successfully')
                },
                err => {
                    console.log(err)
                })
            // this.storeState.amore.play()
        },
        stopAmore() {
            this.stop('amore',
                            () => {
                                console.log('song stopped successfully')
                            },
                            err => {
                                console.log(err)
                            })
        },
        unloadAmore() {
            this.unload('amore',
                            () => {
                                console.log('song unloaded successfully')
                            },
                            err => {
                                console.log(err)
                            })
        }
    },
    watch: {
        'storeState.leftButton'() {
            console.log('left was clicked')
            if (!this.storeState.transitioningToGame){this.moveCursorLeft()}            
        },
        'storeState.centerButton'() {
            console.log('center was clicked')
            if (!this.storeState.transitioningToGame){this.pressSelect()}            
        },
        'storeState.rightButton'() {
            console.log('right was clicked')
            if (!this.storeState.transitioningToGame){this.moveCursorRight()}            
        },
    },
    computed: {
        isSelected() {
            let actionsObject = {
                dribbling: false,
                lead: false,
                powerStartAndStop: false,
                socialize: false,
                eat: false,
                shoot: false,
                lift: false,
                stats: false,
            }
            actionsObject[
                actionsArray[this.selected % actionsArray.length]
            ] = true
            return actionsObject
        },
        prepperoniMargins() {
            return {
                top: this.prepperoniTopMargin,
                left: this.prepperoniLeftMargin,
                transform: `scaleX(${this.prepperoniTransformScaleX})`,
            }
        },
        dynamicPrepperoniFrame() {
            return this.getImgUrl(this.prepperoniFrame)
        }
    },
    mounted() {
        this.updateClassicBallUnlockedPages()
        this.classicBallInterval = setInterval(() => {
            this.updateClassicBallUnlockedPages()
        }, 300000)
        this.movePrepperoniIncrementally()
        this.runIdleAnimation('TamaNexus')
        this.setImageRendering()
        this.listen('resize', this.onResize)
        this.setLabelText('left', 'select', 'right')
        // store.setValue('amore', new Media('/android_asset/www/audio/Prep AMORE2.mp3',() => {console.log('media played successfully')}, (err, msg) => {console.log(err, msg)}))
        // this.loadAmore()
    },
    beforeDestroy() {
        clearInterval(this.classicBallInterval)
        this.unListen('resize', this.onResize)
    },
}
</script>

<style scoped>
.tama-nexus {
    color: black;
    height: 100%;
    width: 100%;
}

.option-button {
    flex-grow: 1;
    flex-basis: auto;
    height: auto;
}

.option-button:before {
    content: '';
    padding-top: 100%;
}
.icon {
    padding: 4px;
    width: 100%;
    height: 100%;
    opacity: 0.1;
}
.icon-black {
    opacity: 1;
}
#top-row {
    justify-self: start;
}
#bottom-row {
    justify-self: end;
}
#middle-content {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.is-highlighted-class {
    opacity: 1 !important;
}
#prepperoni-img {
    position: relative;
    width: 50%;
    height: 50%;
}
.prepperoni-box {
    height: 100%;
    flex: 1;
}
#big-icon {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: vertical;
    justify-content: center;
    align-items: center;
}
#big-icon-img {
    width: 80%;
}
.nexus-temp-button {
    flex: 0;
}
</style>