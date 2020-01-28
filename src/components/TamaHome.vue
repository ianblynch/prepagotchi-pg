<template>
    <div id="tama-home">
        <div class="tama-logic-vert-flex-container">
            <div class="tama-logic-horiz-flex-container">
                <div id="logic-left-gutter"></div>
                <div id="middle-flex-area">
                    <TamaScreen />
                    <TamaButtons />
                </div>
                <div id="logic-right-gutter"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'

export default {
    name: 'TamaHome',
    mixins: [tama],
    data() {
        return {
            storeState: store.state,
        }
    },
    mounted() {
        this.setFrameWidth()
        window.addEventListener('resize', () => {
            this.setFrameWidth()
        })
    },
    methods: {
        setFrameWidth() {
            const theFixedFrame = document.querySelector('#middle-flex-area')
            let heightString = window.innerWidth * 2 + 'px'
            theFixedFrame.style.height = heightString
            let windowHeight = window.innerHeight
            let windowWidth = window.innerWidth
            const adjustedDimensions = this.calcWidthAndHeightForAspectRatio(document.getElementById('canvas-flex-container'), .5)
            console.log(JSON.stringify(adjustedDimensions))
            theFixedFrame.style.width = adjustedDimensions.width * 0.6 + 'px'
            theFixedFrame.style.height = adjustedDimensions.height * 0.6 + 'px'
            //make borderFrameBaselineDimensions = {top, left, height, width}
            // let borderFrameBaselineDimensions = {
            //     height: adjustHeightTo*.6 *.768,
            //     width: adjustWidthTo*.6,
            //     left: (windowWidth - (adjustWidthTo*.6))/2,
            //     top: (windowHeight -(adjustHeightTo*.6))/2,
            //     windowHeight: windowHeight,
            //     windowWidth: windowWidth
            // }
            // store.setValue('borderFrameBaselineDimensions', borderFrameBaselineDimensions)
            store.setValue('insetHeight', adjustedDimensions.height * 0.6 * 0.768 + 'px')
            store.setValue('insetMirrorCss', {
                height: `${adjustedDimensions.height * 0.6 * 0.768}px`,
                width: `${adjustedDimensions.width * 0.6}px`,
            })
            store.setValue('mfaDimensions', {
                top: this.getOffset(theFixedFrame),
                left: this.getOffset(theFixedFrame, true),
                width: theFixedFrame.offsetWidth,
                height: theFixedFrame.offsetHeight,
            })
            this.setCssValues(adjustedDimensions.height * 0.6 * 0.768)
        },
        setCssValues(insetHeight) {
            store.setValue('wideBorder', Math.floor(insetHeight *.01) + 'px')
            store.setValue('medBorder', Math.floor(insetHeight *.005) + 'px')
            store.setValue('thinBorder', Math.floor(insetHeight *.0025) + 'px')
            store.setValue('widePadding', Math.floor(insetHeight *.04) + 'px')
            store.setValue('medPadding', Math.floor(insetHeight *.03) + 'px')
            store.setValue('thinPadding', Math.floor(insetHeight *.02) + 'px')
            document.documentElement.style.setProperty('--wideBorder', Math.floor(insetHeight *.03) + 'px')
            document.documentElement.style.setProperty('--medBorder', Math.floor(insetHeight *.02) + 'px')
            document.documentElement.style.setProperty('--thinBorder', Math.floor(insetHeight *.01) + 'px')
            document.documentElement.style.setProperty('--widePadding', Math.floor(insetHeight *.06) + 'px')
            document.documentElement.style.setProperty('--medPadding', Math.floor(insetHeight *.04) + 'px')
            document.documentElement.style.setProperty('--thinPadding', Math.floor(insetHeight *.02) + 'px')
            document.documentElement.style.setProperty('--wideBorderRadius', Math.floor(insetHeight *.15) + 'px')
            document.documentElement.style.setProperty('--medBorderRadius', Math.floor(insetHeight *.1) + 'px')
            document.documentElement.style.setProperty('--thinBorderRadius', Math.floor(insetHeight *.07) + 'px')
        }
    },
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
