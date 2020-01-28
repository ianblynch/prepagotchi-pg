<template>
    <div>
        <div class="h-full">
            <div id="egg-icon">
                <img class="egg-wiggle" id="egg-icon-img" :src="eggFrame" />
                <!-- <span>{{countdown}}</span> -->
            </div>
        </div>
    </div>
</template>
<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
const hatch0 = require('../assets/pngs/hatching-0.png')
const hatch1 = require('../assets/pngs/hatching-1.png')
const hatch2 = require('../assets/pngs/hatching-2.png')
const hatch3 = require('../assets/pngs/hatching-3.png')
const empty32 = require('../assets/pngs/empty32.png')
const egg0 = require('../assets/pngs/egg-0.png')
const egg1 = require('../assets/pngs/egg-1.png')
const egg2 = require('../assets/pngs/egg-2.png')
const egg3 = require('../assets/pngs/egg-3.png')
export default {
    name: 'EggCard',
    mixins: [tama],
    data() {
        return {
            storeState: store.state,
            eggFrame: empty32,
        }
    },
    methods: {
        transitionToHatched() {
            console.log('starting trans to hatch')
            // let asyncHatch = new Promise( (resolve, reject) => {
            // this.stepFrames('eggFrame', [hatch0, hatch1], 500, 0)
            // resolve()
            // })
            // asyncHatch.then(()=> {store.setValue('prepperoniDevelopmentStatus', 'alive')})
            // .then(() => { store.setValue('currentGameScreen', 'TamaNexus')})
            this.stepFrames(
                'eggFrame',
                [hatch0, hatch1, hatch2, hatch3],
                1000,
                0,
                () => {
                    store.setValue('prepperoniDevelopmentStatus', 'alive', true)
                    store.setValue('currentGameScreen', 'TamaNexus', true)
                }
            )
        },
        getStatusThenCallAppropriateMethod() {
            let theStatus = this.storeState.prepperoniDevelopmentStatus
            console.log(theStatus)
            if (theStatus === 'egg') {
                //timer has started
                const max = 30000
                console.log('hatchTimer: ' + this.storeState.hatchTimer)
                if (
                    this.storeState.hatchTimer === '' ||
                    this.storeState.hatchTimer === undefined ||
                    this.storeState.hatchTimer === null
                ) {
                    let timeNow = new Date().getTime()
                    // let hatchTime = timeNow + 900000
                    let hatchTime = timeNow + max
                    let msDiff = hatchTime - timeNow
                    store.setValue('hatchTimer', hatchTime, true)
                    this.setEggPicAndTimers(msDiff, max)
                    setTimeout(() => {
                        console.log('hatch timeout')
                        this.transitionToHatched()
                    }, msDiff)
                } else {
                    console.log('timer exists')
                    let hatchTime = this.storeState.hatchTimer
                    let timeNow = new Date().getTime()
                    let msDiff = hatchTime - timeNow
                    let diff = msDiff / 60000
                    console.log(diff)
                    if (diff <= 0) {
                        this.transitionToHatched()
                    } else {
                        console.log('Time until hatch: ' + diff)
                        this.setEggPicAndTimers(msDiff, max)
                        this.storeState.hatchTimeout = setTimeout(() => {
                            console.log('hatch timeout')
                            this.transitionToHatched()
                        }, msDiff)
                    }
                }
            } else {
                store.setValue('currentGameScreen', 'TamaNexus', true)
            }
        },
        setEggPicAndTimers(msDiff, max) {
            console.log('starting setEggPicAndTimers')
            const percentFinished = msDiff / max
            console.log('START percentFinished: ' + percentFinished)
            let oneQuarterLeft = max * 0.25
            let oneHalfLeft = max * 0.5
            let threeQuartersLeft = max * 0.75

            if (msDiff > oneQuarterLeft) {
                let timeUntil = msDiff - oneQuarterLeft
                console.log('set one quarter timeout')
                this.storeState.oneQuarterEggTimeout = setTimeout(() => {
                    console.log('fire one quarter timeout')
                    this.eggFrame = egg3
                }, timeUntil)
            }
            if (msDiff > oneHalfLeft) {
                let timeUntil = msDiff - oneHalfLeft
                console.log('set one half timeout')
                this.storeState.oneHalfEggTimeout = setTimeout(() => {
                    console.log('fire one half timeout')
                    this.eggFrame = egg2
                }, timeUntil)
            }
            if (msDiff > threeQuartersLeft) {
                let timeUntil = msDiff - threeQuartersLeft
                console.log('set three quarters timeout')
                this.storeState.threeQuartersEggTimeout = setTimeout(() => {
                    console.log('fire three quarters timeout')
                    this.eggFrame = egg1
                }, timeUntil)
            }
            if (percentFinished < 0.25) {
                console.log(
                    '!!!! percentFinished: ' +
                        percentFinished +
                        '; switch is <.25'
                )
                this.eggFrame = egg3
            } else if (percentFinished < 0.5) {
                console.log(
                    '!!!! percentFinished: ' +
                        percentFinished +
                        '; switch is <.5'
                )
                this.eggFrame = egg2
            } else if (percentFinished < 0.75) {
                console.log(
                    '!!!! percentFinished: ' +
                        percentFinished +
                        '; switch is <.75'
                )
                this.eggFrame = egg1
            } else if (percentFinished >= 0.75) {
                console.log(
                    '!!!! percentFinished: ' +
                        percentFinished +
                        '; switch is >=.75'
                )
                this.eggFrame = egg0
            }
        },
        onResize() {
            this.setImageRendering()
        }
    },
    beforeDestroy() {
        clearTimeout(this.storeState.oneQuarterEggTimeout)
        clearTimeout(this.storeState.oneHalfEggTimeout)
        clearTimeout(this.storeState.threeQuartersEggTimeout)
        this.unListen('resize', this.onResize)
    },
    created() {
        this.getStatusThenCallAppropriateMethod()
    },
    mounted() {
        this.onResize() 
        this.listen('resize', this.onResize)
        this.setLabelText("***", "***", "***")
    }
}
</script>

<style scoped>
#egg-icon {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: vertical;
    justify-content: center;
    align-items: center;
}
#egg-icon-img {
    width: 80%;
}
</style>