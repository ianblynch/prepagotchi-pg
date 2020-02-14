<template>
    <div id="tama-buttons" :style="containerCss">
        <div class="button-unit-container">
            <ButtonLabel :style="labelCss" :label="leftLabelText"/>
            <button
                class="tama-button three-button"
                :style="buttonCss"
                id="left-button"
                @click="clickedLeft()"
            ></button>
        </div>
        <div class="button-unit-container">
            <ButtonLabel id="center-label" :style="[labelCss, centerLabelCss]" :label="centerLabelText"/>
            <button
                class="tama-button three-button"
                :style="[buttonCss, centerButtonCss]"
                id="center-button"
                @click="clickedCenter()"
            ></button>
        </div>
        <div class="button-unit-container">
            <ButtonLabel :style="labelCss" :label="rightLabelText"/>
            <button
                class="tama-button three-button"
                :style="buttonCss"
                id="right-button"
                @click="clickedRight()"
            ></button>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
import { audio } from '../mixins/audio.js'
const leftNode = document.getElementById('left-button')
const centerNode = document.getElementById('center-button')
const rightNode = document.getElementById('right-button')
export default {
    name: 'TamaButtons',
    mixins: [tama, audio],
    data() {
        return {
            storeState: store.state,
            buttonCss: {},
            containerCss: {},
            centerButtonCss: {},
            labelCss: {},
            centerLabelCss: {},
            leftLabelText: '',
            centerLabelText: '',
            rightLabelText: ''
        }
    },
    methods: {
        clickedLeft() {
            store.setValue('leftButton', this.storeState.leftButton + 1)
            this.runAnimation('left-button')
            this.playSfx('sfx0')
        },
        clickedCenter() {
            store.setValue('centerButton', this.storeState.centerButton + 1)
            this.runAnimation('center-button')
            this.playSfx('sfx1')
        },
        clickedRight() {
            store.setValue('rightButton', this.storeState.rightButton + 1)
            this.runAnimation('right-button')
            this.playSfx('sfx2')
        },
        setDiameter() {
            let insetHeight = this.getInsetScreenDimensions().innerHeight
            let diameter = insetHeight * 0.1
            this.buttonCss = {
                height: diameter + 'px',
                width: diameter + 'px',
            }
            this.containerCss = {
                'margin-top': diameter * 1 + 'px',
            }
            this.labelCss = {
                'margin-bottom': diameter * 0.3 + 'px',
            }
            this.centerButtonCss = {
                top: diameter * 0.6 + 'px',
            }
            this.centerLabelCss = {
                top: diameter * 0.6 + 'px',
            }
            document.documentElement.style.setProperty(
                '--center-button-top',
                diameter * 0.6 + 'px'
            )
            document.documentElement.style.setProperty(
                '--center-button-pressed-top',
                diameter * 0.6 + 2 + 'px'
            )
        },
        removeAnimationClass(id) {
            const node = document.getElementById(id)
            let theClass =
                id === 'center-button' ? 'pressed-center' : 'pressed-button'
            node.classList.remove(theClass)
            node.removeEventListener('animationend', () => {
                this.removeAnimationClass(node)
            })
        },
        runAnimation(id) {
            const node = document.getElementById(id)
            let theClass =
                id === 'center-button' ? 'pressed-center' : 'pressed-button'
            node.classList.add(theClass)
            node.addEventListener('animationend', () => {
                this.removeAnimationClass(id)
            })
        },
        onResize() {
            this.$nextTick().then(() => {
                this.setDiameter()
            })
        },
    },
    mounted() {
        this.onResize()
        // this.listen('resize', this.onResize)
    },
    beforeDestroy() {
        // this.unListen('resize', this.onResize)
    },    
    watch: {
        'storeState.leftLabelText'() {
            console.log('left was clicked')
            this.leftLabelText = this.storeState.leftLabelText
        },
        'storeState.centerLabelText'() {
            console.log('center was clicked')
            this.centerLabelText = this.storeState.centerLabelText
        },
        'storeState.rightLabelText'() {
            console.log('right was clicked')
            this.rightLabelText =   this.storeState.rightLabelText
        },
        'storeState.insetMirrorCss': {
            deep: true,
            handler() {
                this.onResize()
            }
        }
    },
}
</script>

<style scoped>
</style>