<template>
    <div class="h-full">
        <div id="classic-ball-card" class="h-full" v-text="text" :style="contCss"></div>
    </div>
</template>

<script>
import textFit from 'textfit'
import { classicBall } from '../data/classicBall.js'
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'

export default {
    name: 'ClassicBall',
    mixins: [tama],
    data() {
        return {
            storeState: store.state,
            contCss: {},
            workingFromQueue: false,
        }
    },
    methods: {
        fit() {
            textFit(document.getElementById('classic-ball-card'), {
                multiLine: true,
                alignHoriz: true,
                alignVert: true,
                maxFontSize: 20,
            })
        },
        return() {
            store.setValue('currentGameScreen', 'TamaNexus')
        },
        shiftQueue() {
            this.workingFromQueue = true
            if (this.storeState.classicBallQueue.length > 0) {
                let workingQueue = [...this.storeState.classicBallQueue]
                let theIndex = workingQueue.shift()
                store.setValue('classicBallIndex', theIndex, true)
                store.setValue('classicBallQueue', workingQueue, true)
                //replace storeState.classicBallInitialShows
                let newInitialShows = [...this.storeState.classicBallInitialShows]
                newInitialShows[theIndex] = true
                store.setValue('classicBallInitialShows', newInitialShows, true)
 
                if (this.storeState.classicBallQueue.length === 0) {
                    this.workingFromQueue = false
                }
            }
        },
        onResize() {
            this.$nextTick().then(() => {
                this.fit()
            })
            this.setImageRendering()
        }
    },
    watch: {
        'storeState.leftButton'() {
            console.log('left was clicked')
            if (this.workingFromQueue) {
                this.shiftQueue()
            } else {
                if (this.storeState.classicBallIndex === 0) {
                    this.return()
                } else {
                    store.setValue(
                        'classicBallIndex',
                        this.storeState.classicBallIndex - 1
                    )
                    this.$nextTick().then(() => {
                        this.fit()
                    })
                }
            }
        },
        'storeState.centerButton'() {
            console.log('center was clicked')
            if (this.workingFromQueue) {
                this.shiftQueue()
            } else {
                this.return()
            }
        },
        'storeState.rightButton'() {
            console.log('right was clicked')
            if (this.workingFromQueue) {
                this.shiftQueue()
            } else {
                if (
                    this.storeState.classicBallIndex >=
                    this.lastUnlockedPageIndex
                ) {
                    this.return()
                } else {
                    store.setValue(
                        'classicBallIndex',
                        this.storeState.classicBallIndex + 1
                    )
                    this.$nextTick().then(() => {
                        this.fit()
                    })
                }
            }
        },
        'storeState.insetMirrorCss'() {
            this.contCss = this.storeState.insetMirrorCss
        },
        'storeState.classicBallIndex'() {
            this.$nextTick().then(() => {
                this.fit()
            })
        },
    },
    mounted() {
        if (this.storeState.classicBallQueue.length === 0) {
            store.setValue('classicBallIndex', 0, true)
        } else {
            this.shiftQueue()
        }
        this.$nextTick().then(() => {
            this.fit()
        })
        this.listen('resize', this.onResize)
        //load queue
        this.setLabelText('left', 'home', 'right')
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    },
    computed: {
        title() {
            let theTitle = false
            if (this.storeState.classicBallIndex === 0) {
                theTitle = 'The Classic Wheelchair Ball'
            }
            return theTitle
        },
        text() {
            return classicBall[this.storeState.classicBallIndex]
        },
        lastUnlockedPageIndex() {
            let count = 0
            this.storeState.classicBallUnlockedPages.forEach(bool => {
                if (bool) {
                    count++
                }
            })
            return count -1
        }
    },
}
</script>

<style scoped>
</style>