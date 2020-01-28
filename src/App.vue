<template>
    <div
        class="app-container full-card flex flex-col justify-start text-center w-full break-words h-full fixed items-center background-color-rad-0"
    >
        <!-- background elements -->
        <div class="layer--background-elements fixed h-full w-full">
            <CardElement
                v-for="(bgElement, bgElementIndex) in currentCardInstance.backgroundElements"
                :key="`bgElement-${bgElementIndex}`"
                :element="bgElement"
                :defaults="currentCardInstance.defaults"
            />
        </div>

        <!-- main elements -->
        <div
            class="layer--main-elements max-w-3xl p-16 block z-index-1 h-full w-full"
            v-if="lsLoaded"
        >
            <CardElement
                v-for="(cardElement, cardElementIndex) in currentCardInstance.cardElements"
                :key="`card-element-${cardElementIndex}`"
                :element="cardElement"
                :defaults="currentCardInstance.defaults"
            />
            <!-- <div class="p-16"></div> -->
        </div>

        <!-- foreground elements -->
        <!-- <div class="layer--foreground-elements fixed h-full w-full pointer-events-none z-index-2"> -->
        <CardElement
            v-for="(fgElement, fgElementIndex) in currentCardInstance.foregroundElements"
            :key="`fgElement-${fgElementIndex}`"
            :element="fgElement"
            :defaults="currentCardInstance.defaults"
        />
        <!-- </div> -->
    </div>
</template>

<script>
import CardElement from './components/CardElement.vue'
import { store } from './data/store.js'
import story, { cards } from './data/tamaStory.js'
var lastTouchEnd = 0
const aspects = [
    'belly',
    'brain',
    'muscle',
    'reflex',
    'stamina',
    'touch',
    'will',
]
export default {
    name: 'app',
    components: {
        CardElement,
    },
    data() {
        return {
            lsLoaded: false,
            storeState: store.state,
            cards,
        }
    },
    methods: {
        subtractDaysSinceHatch() {
            aspects.forEach(asp => {
                const theAspect = this.storeState[asp]
                store.setValue(`net${asp}`, theAspect - this.daysSinceHatch, true)
            })
        },
        checkIfDead() {
            let isDead = false
            //is dead if more than 4 net aspects are < -1
            let neg1Counter = 0
            //is dead if all are < 1
            let pos1Counter = 0
            aspects.forEach(asp => {
                if (this.storeState[`net${asp}`] < -1) {
                    neg1Counter++
                }
                if (this.storeState[`net${asp}`] < 1) {
                    pos1Counter++
                }
            })
            if (neg1Counter > 4 || pos1Counter > 6) {
                //kill
                isDead= true
                store.setValue('currentGameScreen', 'GraveScreen', true)
            }
            return isDead
        },
        setDaysAlive() {
            let days
            const oneDayMS = 86400000
            const threeDays = oneDayMS *3
            //get time now 
            let now = new Date().getTime()
            let hatchTime = this.storeState.hatchTimer - threeDays
            let diffMS = now - hatchTime
            days = Math.floor(diffMS / oneDayMS)           
            store.setValue('daysAlive', days, true)
        }
    },
    mounted() {
        let asyncLoad = new Promise((resolve, reject) => {
            try {
                store.loadLS('prepperoni')
                resolve()
            } catch (error) {
                reject(error)
            }
        })
        asyncLoad
            .then(
                () => {
                    this.lsLoaded = true
                    this.subtractDaysSinceHatch()
                },
                error => {
                    console.log(error)
                }
            )
            .then(() => {
                this.checkIfDead()
            })
    },

    computed: {
        currentCardInstance() {
            // debugger
            let draft
            this.cards().cardInstances.forEach(ci => {
                if (ci.id === store.getValue('currentCardInstance')) {
                    draft = ci
                }
            })
            return draft
        },
        daysSinceHatch() {
            let num = 0
            if (this.storeState.hatchTimer) {
                let now = new Date().getTime()
                let hatch = this.storeState.hatchTimer
                num = Math.floor((now - hatch) / 86400000)
            }
            return num
        }
    },
    watch: {
        storeState: {
            deep: true,
            handler() {
                this.lsLoaded = true
            },
        },
        'storeState.belly'() {
            this.subtractDaysSinceHatch()
        },
        'storeState.brain'() {
            this.subtractDaysSinceHatch()
        },
        'storeState.muscle'() {
            this.subtractDaysSinceHatch()
        },
        'storeState.reflex'() {
            this.subtractDaysSinceHatch()
        },
        'storeState.stamina'() {
            this.subtractDaysSinceHatch()
        },
        'storeState.touch'() {
            this.subtractDaysSinceHatch()
        },
        'storeState.will'() {
            this.subtractDaysSinceHatch()
        },        
        'storeState.netbelly'() {
            if (!this.storeState.resetting) {
                this.checkIfDead()
            }
        },        
        'storeState.netbrain'() {
            if (!this.storeState.resetting) {
                this.checkIfDead()
            }
        },        
        'storeState.netmuscle'() {
            if (!this.storeState.resetting) {
                this.checkIfDead()
            }
        },        
        'storeState.netreflex'() {
            if (!this.storeState.resetting) {
                this.checkIfDead()
            }
        },        
        'storeState.netstamina'() {
            if (!this.storeState.resetting) {
                this.checkIfDead()
            }
        },        
        'storeState.nettouch'() {
            if (!this.storeState.resetting) {
                this.checkIfDead()
            }
        },        
        'storeState.netwill'() {
            if (!this.storeState.resetting) {
                this.checkIfDead()
            }
        }
    },
}
</script>

<style>
@import './assets/css/scr.css';
@import './assets/css/textly.css';
@import './assets/css/textly-utilities.css';
@import './assets/css/tama.css';

.css-preview-container {
    height: 50px;
}

#demo-app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.break-words {
    word-break: break-word;
}
#demo-app {
    background-color: black;
}
</style>
