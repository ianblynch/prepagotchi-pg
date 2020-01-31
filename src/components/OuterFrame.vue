<template>
    <div id="outer-frame" class="absolute h-full w-full">
        <div id="canvas-images"></div>
        <div id="canvas-flex-container">
            <canvas id="bg-canvas" :style="canvasStyle"></canvas>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
export default {
    name: 'OuterFrame',
    mixins: [tama],
    data() {
        return {
            storeState: store.state,
            provider: {
                context: null,
            },
            canvasStyle: {
            },
        }
    },
    methods: {
        onResize() {
            store.setValue('bgX', window.innerWidth)
            store.setValue('bgY', window.innerHeight)
            this.$nextTick().then(()=>{
                this.draw()
            })
        },
        setBorderPointVariances(num) {
            let randomVariances = []
            for (let i = 0; i < num; i++) {
                randomVariances.push({
                    x: Math.random() - 0.5,
                    y: Math.random() - 0.5,
                })
            }
            store.setValue('borderPointVariances', randomVariances)
        },
        calcBorderPoints(insetScreen) {
            //calcBorderPoints will return an array of points to be drawn

            // screenDimensions has 4 keys: top, left, width, and height, all Numbers
            // mfa has 4 keys: top, left, width, and height, all Numbers
            //insetScreen has 4 keys: top, left, width, and height, all Numbers

            //start in top left and work around
            //first establish the anchor points
            //each side will have an odd number of points, so iterate
            //0 to 4 for example and if i % 2 === 0 it is high, else it is low, so pass 5 to howManyPoints
            // high is a percent of insetScreen width away from the side, low is half that
            const makeSideAnchorPoints = function(
                howManyPoints,
                side,
                insetScreen
            ) {
                // if (side === 'top') {
                // console.log('height')
                // console.log(insetScreen.height)
                // console.log('width')
                // console.log(insetScreen.width)

                // }
                //first i will calc 15% of insetScreen.left this will be the low line
                //then i will calc 25% of insetScreen.left this will be the high line
                let low = insetScreen.width * 0.05
                let high = insetScreen.width * 0.1
                //now i take insetScreen
                let spacingAlongSide =
                    side === 'top' || side === 'bottom'
                        ? insetScreen.width / (howManyPoints - 1)
                        : insetScreen.height / (howManyPoints - 1)
                //make a side that is the same regardless i will give an object with keys along and height
                //which will get translated to x and y related to which side it is later
                let agnosticPoints = []
                for (let i = 0; i < howManyPoints; i++) {
                    let height = i % 2 === 0 ? high : low
                    let along = i * spacingAlongSide
                    agnosticPoints.push({ height: height, along: along })
                }
                //now tailor to it's side (top, bottom, left, or right) and map it to sidePoints
                let sidePoints
                if (side === 'top') {
                    const baselineAlong = insetScreen.left
                    const baselineHeight = insetScreen.top
                    sidePoints = agnosticPoints.map(ap => {
                        return {
                            x: baselineAlong + ap.along,
                            y: baselineHeight - ap.height,
                        }
                    })
                }
                if (side === 'right') {
                    const baselineAlong = insetScreen.top
                    const baselineHeight = insetScreen.left + insetScreen.width
                    sidePoints = agnosticPoints.map(ap => {
                        return {
                            x: baselineHeight + ap.height,
                            y: baselineAlong + ap.along,
                        }
                    })
                }
                if (side === 'bottom') {
                    const baselineAlong = insetScreen.left + insetScreen.width
                    const baselineHeight = insetScreen.top + insetScreen.height
                    sidePoints = agnosticPoints.map(ap => {
                        return {
                            x: baselineAlong - ap.along,
                            y: baselineHeight + ap.height,
                        }
                    })
                }
                if (side === 'left') {
                    const baselineAlong = insetScreen.top + insetScreen.height
                    const baselineHeight = insetScreen.left
                    sidePoints = agnosticPoints.map(ap => {
                        return {
                            x: baselineHeight - ap.height,
                            y: baselineAlong - ap.along,
                        }
                    })
                }
                return sidePoints
            }
            let topPoints = makeSideAnchorPoints(5, 'top', insetScreen)
            let rightPoints = makeSideAnchorPoints(9, 'right', insetScreen)
            let bottomPoints = makeSideAnchorPoints(5, 'bottom', insetScreen)
            let leftPoints = makeSideAnchorPoints(9, 'left', insetScreen)

            return topPoints.concat(rightPoints, bottomPoints, leftPoints)
        },
        establishImageElement(src, id, width, height) {
            let theImg = document.getElementById(id)
            if (theImg === undefined || theImg === null) {
                theImg = document.createElement('img')
                theImg.id = id
                document.getElementById('canvas-images').appendChild(theImg)
            }
            theImg.src = src
            // theImg.style.filter = 'hue-rotate(90deg)'
            theImg.setAttribute('height', height + 'px')
            theImg.setAttribute('width', width + 'px')
            return theImg
        },
        drawImageToCanvas(ctx, src, id, dx, dy, dWidth, dHeight, filter) {
            let theImg = this.establishImageElement(src, id, dWidth, dHeight)
            if (filter) {
                theImg.style.filter = filter
            }
            theImg.onload = () => {
                ctx.drawImage(theImg, dx, dy, dWidth, dHeight)
            }
        },
        draw() {
            if (this.storeState.borderPointVariances.length === 0) {
                this.setBorderPointVariances(28)
            }
            // this.$nextTick().then(() => {
                // let insetScreen = this.storeState.insetScreenDimensions
                let c = document.getElementById('bg-canvas')
                let canvasDimensions = this.getCanvasStyle()
                c.width = canvasDimensions.width
                c.height = canvasDimensions.height
                // c.style.borderRadius = canvasDimensions['border-radius']
                // c.style.boxShadow = '-5px 5px 2px 0px rgba(0, 0, 0, 0.40)'
                // c.style.border = 'solid black 4px'
                let insetScreen = this.getInsetScreenDimensionsForCanvas()
                let ctx = c.getContext('2d')
                let x2 = this.storeState.bgX
                let y2 = this.storeState.bgY
                let borderPoints = this.calcBorderPoints(insetScreen)
                // console.log(JSON.stringify(borderPoints))
                ctx.fillStyle = 'green'
                ctx.strokeStyle = 'green'
                ctx.beginPath()
                let baseVariance = insetScreen.width * 0.07
                let variancesArray = [...this.storeState.borderPointVariances]
                borderPoints.forEach((pt, ptIndex) => {
                    const varianceX =
                        baseVariance * (variancesArray[ptIndex].x || 0)
                    const varianceY =
                        baseVariance * (variancesArray[ptIndex].y || 0)
                    if (ptIndex === 0) {
                        ctx.moveTo(pt.x + varianceX, pt.y + varianceY)
                    } else {
                        ctx.lineTo(pt.x + varianceX, pt.y + varianceY)
                    }
                })
                ctx.fill()
                ctx.closePath()
                ctx.stroke()
                ctx.strokeStyle = 'red'

                //to test and make sure the frame is aligned properly
                // ctx.beginPath()
                // borderPoints.forEach((pt, ptIndex) => {
                //     if (ptIndex === 0) {
                //         ctx.moveTo(pt.x, pt.y)
                //     } else if (ptIndex === 5 || ptIndex === 14 || ptIndex === 19) {
                //         ctx.lineTo(pt.x, pt.y)
                //     }
                // })
                // ctx.closePath()
                // ctx.stroke()
                const screenWidthPercentage = insetScreen.width * 0.5
                let maxWidth = c.offsetWidth
                let maxHeight = c.offsetHeight

                const logoWidth = insetScreen.width * 1.1
                const logoHeight = logoWidth * (208/700)
                const logoX = (maxWidth - logoWidth)/2
                const logoY = maxHeight * 0.05
                const imgsArray = [
                    {
                        src: require('../assets/pngs/border-img0.png'),
                        id: 'border-img0',
                        dx: maxWidth * 0.05,
                        dy: maxHeight * 0.01,
                        dWidth: screenWidthPercentage,
                        dHeight: screenWidthPercentage,
                    },
                    {
                        src: require('../assets/pngs/border-img1.png'),
                        id: 'border-img1',
                        dx: maxWidth * 0.7,
                        dy: maxHeight * 0.01,
                        dWidth: screenWidthPercentage,
                        dHeight: screenWidthPercentage,
                    },
                    {
                        src: require('../assets/pngs/border-img2.png'),
                        id: 'border-img2',
                        dx: maxWidth * 0.05,
                        dy: maxHeight * 0.7,
                        dWidth: screenWidthPercentage,
                        dHeight: screenWidthPercentage,
                    },
                    {
                        src: require('../assets/pngs/border-img3.png'),
                        id: 'border-img3',
                        dx: maxWidth * 0.35,
                        dy: maxHeight * 0.8,
                        dWidth: screenWidthPercentage,
                        dHeight: screenWidthPercentage,
                    },
                    {
                        src: require('../assets/pngs/border-img4.png'),
                        id: 'border-img4',
                        dx: maxWidth * 0.75,
                        dy: maxHeight * 0.7,
                        dWidth: screenWidthPercentage,
                        dHeight: screenWidthPercentage,
                    },
                    {
                        src: require('../assets/pngs/prepagotchi-logo-trans-700.png'),
                        id: 'prepagotchi-logo-trans',
                        dx: logoX,
                        dy: logoY,
                        dWidth: logoWidth,
                        dHeight: logoHeight,
                    },
                    {
                        src: require('../assets/pngs/prepagotchi-logo-just-inside-700.png'),
                        id: 'prepagotchi-logo-inside',
                        dx: logoX,
                        dy: logoY,
                        dWidth: logoWidth,
                        dHeight: logoHeight,
                        filter: 'hue-rotate(90deg)'
                    }
                ]
                imgsArray.forEach(img => {
                    let filter = img.filter ? img.filter : null
                    this.drawImageToCanvas(
                        ctx,
                        img.src,
                        img.id,
                        img.dx,
                        img.dy,
                        img.dWidth,
                        img.dHeight,
                        filter
                    )
                })
            // })
        },
        getCanvasStyle() {
            let adjustedDimensions = this.calcWidthAndHeightForAspectRatio(document.getElementById('canvas-flex-container'), 0.5)
            return {
                border: 'none',
                width: adjustedDimensions.width  - (adjustedDimensions.height*.02),
                height: adjustedDimensions.height - (adjustedDimensions.height*.02),
                'border-radius': `${adjustedDimensions.height*.05}px`
            }
        },
    },
    mounted() {
        // this.makeBgTesselation()
    },

    watch: {
        'storeState.insetScreenDimensions': {
            deep: true,
            handler() {
                this.$nextTick().then(() => {
                    this.onResize()
                })
            },
        },
    },
}
</script>

<style scoped>
</style>