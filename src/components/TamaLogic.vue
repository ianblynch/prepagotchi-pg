<template>
    <div id="tama-logic">
        <div class="tama-logic-vert-flex-container">
            <div class="tama-logic-horiz-flex-container">
                <div id="logic-left-gutter"></div>
                <template v-if="element.children">
                    <RadElement
                        class="inset-screen lvl1"
                        :key="`element-child-${compKeys[childIndex]}`"
                        v-for="(child, childIndex) in element.children"
                        :element="child"
                        :globals="globals"
                        :leftButton="leftButton"
                        :centerButton="centerButton"
                        :rightButton="rightButton"
                        :availableActions="availableActions"
                        @emit-set-new-card-and-branch="emitSetNewCardAndBranch(...arguments)"
                        @emit-update-global="emitUpdateGlobal(...arguments)"
                    />
                </template>
                <div id="logic-right-gutter"></div>
            </div>
            <div id="logic-three-buttons">
            <button class="tama-button jagged-border three-button" id="left-button" @click="clickedLeft()"></button>
            <button class="tama-button jagged-border three-button" id="center-button" @click="clickedCenter()"></button>
            <button class="tama-button jagged-border three-button" id="right-button" @click="clickedRight()"></button>

            </div>
        </div>
    </div>
</template>

<script>

import RadElement from './RadElement.vue'
import { compValues } from '../mixins/compValues.js'
import { global } from '../mixins/global.js'
import { tama } from '../mixins/tama.js'

export default {
    name: "TamaLogic",
    mixins: [compValues, global, tama],
    components: {
        RadElement,
    },
    props: {
        globals: {
            type: Object
        }
    },
    data() {
        return {
            leftButton: 0,
            centerButton: 0,
            rightButton: 0,
            phase: '',

        }
    },
    computed: {
        availableActions() {
            //start with all available actions false
            let actionsObject = {
                eatProtein: false, eatCarbs: false, eatVeggies: false, liftWeights: false, watchGameFilm: false, study: false, socialize: false, push: false, manifest: false, meditate: false, lead: false, powerStartAndStop: false, shootHoops: false, dribbling: false
            }
            // start with all current values as 0
            let currentValues = {
                fuel: 0,
                refuel: 0,
                power: 0,
                brain: 0,
                stamina: 0,
                will: 0

            }
            let currentRegister = []
            if (this.globals.dragoni) {
                if (this.globals.dragoni.fuel) {
                    currentValues.fuel = this.globals.dragoni.fuel
                }
                if (this.globals.dragoni.refuel) {
                    currentValues.fuel = this.globals.dragoni.refuel
                }
                if (this.globals.dragoni.power) {
                    currentValues.fuel = this.globals.dragoni.power
                }
                if (this.globals.dragoni.brain) {
                    currentValues.fuel = this.globals.dragoni.brain
                }
                if (this.globals.dragoni.stamina) {
                    currentValues.fuel = this.globals.dragoni.stamina
                }
                if (this.globals.dragoni.will) {
                    currentValues.fuel = this.globals.dragoni.will
                }
                if (this.globals.dragoni.register) {
                    currentRegister = [...this.globals.dragoni.register]
                }
            }
            let mostRecentTries = {
                fuel: 0,
                refuel: 0,
                power: 0,
                brain: 0,
                stamina: 0,
                will: 0
            }
            currentRegister.forEach(reg => {
                if (Object.keys(mostRecentTries).indexOf(reg.name) > -1) {
                    if ( mostRecentTries[reg.name] === 0 || mostRecentTries[reg.name] < reg.time) {
                        mostRecentTries[reg.name] = reg.time
                    }
                }
            })
            let timeSinceMostRecentTries = {}
            function calcTimeSinceTry(key, mostRecentTries) {
                if (mostRecentTries[key] === 0) {
                    return 'never'
                } else {
                    let time = (new Date().getTime() - mostRecentTries[key])/60000
                    return time
                }
            }
            Object.keys(mostRecentTries).forEach(key => {
                let val = calcTimeSinceTry(key, mostRecentTries)
                timeSinceMostRecentTries[key] = val
            })
            if (timeSinceMostRecentTries.refuel > 10 || timeSinceMostRecentTries.refuel === 'never' ) {
                actionsObject.eatProtein = true
            }
            if (timeSinceMostRecentTries.fuel > 10 || timeSinceMostRecentTries.fuel === 'never' ) {
                actionsObject.eatCarbs = true
                actionsObject.eatVeggies = true
            }
            if (timeSinceMostRecentTries.power > 10 || timeSinceMostRecentTries.power === 'never' ) {
                actionsObject.shootHoops = true
                actionsObject.liftWeights = true
            }
            if (timeSinceMostRecentTries.brain > 10 || timeSinceMostRecentTries.brain === 'never' ) {
                actionsObject.watchGameFilm = true
                actionsObject.study = true
                actionsObject.socialize = true
            }
            if (timeSinceMostRecentTries.stamina > 10 || timeSinceMostRecentTries.stamina === 'never' ) {
                actionsObject.powerStartAndStop = true
                actionsObject.dribbling = true
            }
            if (timeSinceMostRecentTries.will > 10 || timeSinceMostRecentTries.will === 'never' ) {
                actionsObject.manifest = true
                actionsObject.meditate = true
                actionsObject.lead = true
            }
            actionsObject.currentRegister = [...currentRegister]
            actionsObject.mostRecentTries = {...mostRecentTries}
            actionsObject.timeSinceMostRecentTries = {...timeSinceMostRecentTries}
            return actionsObject
        }
    }
}
</script>

<style scoped>
#left-button {
    width: 40px;
    height: 30px;
}
#center-button {
    position: relative;
    top: 20px;
    width: 40px;
    height: 30px;
}
#right-button {
    width: 40px;
    height: 30px;
}
.three-button {
    border-radius: 10px;
    background-color: lightskyblue;
}
.three-button:before {
    border-radius: 10px;
}
.three-button:after {
    border-radius: 8px;
}
</style>
