import { store } from '../data/store.js'
import mergeImages from 'merge-images'
import { audio } from './audio'
import Vue from 'vue'

const psns0 = require('../assets/pngs/psns-0.png')
const psns1 = require('../assets/pngs/psns-1.png')
const psns2 = require('../assets/pngs/psns-2.png')
const psns3 = require('../assets/pngs/psns-3.png')
const cloud0 = require('../assets/pngs/cloud-0.png')
const cloud1 = require('../assets/pngs/cloud-1.png')
const cloud2 = require('../assets/pngs/cloud-2.png')
const checkStart = require('../assets/pngs/check-start.png')
const checkMid = require('../assets/pngs/check-mid.png')
const checkFinish = require('../assets/pngs/check-finish.png')
const xStart = require('../assets/pngs/x-start.png')
const xMid = require('../assets/pngs/x-mid.png')
const xFinish = require('../assets/pngs/x-finish.png')
const pullupIcon = require('../assets/pngs/pullup-icon.png')
const leftDumbbellIcon = require('../assets/pngs/dumbbell-icon.png')
const rightDumbbellIcon = require('../assets/pngs/dumbbell-icon.png')
const dipIcon = require('../assets/pngs/dip-icon.png')
const leftCurl0 = require('../assets/pngs/left-curl-0.png')
const leftCurl1 = require('../assets/pngs/left-curl-1.png')
const rightCurl0 = require('../assets/pngs/right-curl-0.png')
const rightCurl1 = require('../assets/pngs/right-curl-1.png')
const pullup0 = require('../assets/pngs/pullup-0.png')
const pullup1 = require('../assets/pngs/pullup-1.png')
const dip0 = require('../assets/pngs/dip-0.png')
const dip1 = require('../assets/pngs/dip-1.png')
const highHand = require('../assets/pngs/socialize-two-hands-up.png')
const leftHand = require('../assets/pngs/socialize-left-hand.png')
const rightHand = require('../assets/pngs/socialize-right-hand.png')
const lowHand = require('../assets/pngs/socialize-two-hands-down.png')
const highFiveHigh = require('../assets/pngs/high-five-high.png')
const highFiveRight = require('../assets/pngs/high-five-right.png')
const highFiveLow = require('../assets/pngs/high-five-low.png')
const highFiveLeft = require('../assets/pngs/high-five-left.png')
export const tama = Vue.util.mergeOptions(audio,{
    methods: {
        stepFrames(frameName, framesArray, speed, inc = 0, callback) {
            //speed can be an array or a number; lets get a value
            let speedNumber
            if (typeof speed === 'number') {
                speedNumber = speed
            } else {
                speedNumber = speed[inc]
            }
            if (inc === 0) {
                clearTimeout(this.storeState[`${frameName}Timeout`])
            }
            if (inc > framesArray.length - 1) {
                if (callback && typeof callback === 'function') {
                    return callback()
                }
                return
            } else {
                // console.log('start: '+ JSON.stringify(framesArray[inc]))
                if (typeof framesArray[inc] === 'string'){
                    this[frameName] = framesArray[inc]
                } else if (typeof framesArray[inc] === 'object') {
                    // console.log('object: '+ JSON.stringify(framesArray[inc]))
                    if (Object.keys(framesArray[inc]).indexOf('frame') >-1 && typeof framesArray[inc].frame === 'string') {
                        this[frameName] = framesArray[inc].frame
                    }
                    if (Object.keys(framesArray[inc]).indexOf('sfx') > -1 && typeof framesArray[inc].sfx === 'string') {
                        // console.log('sfx: '+ framesArray[inc].sfx)
                        this.playSfx(framesArray[inc].sfx)
                    }
                    if (Object.keys(framesArray[inc]).indexOf('css') > -1 && typeof framesArray[inc].css === 'object') {
                        this[frameName]= framesArray[inc].css
                    }
                }
                this.storeState[`${frameName}Timeout`] = setTimeout(() => {
                    return this.stepFrames(
                        frameName,
                        framesArray,
                        speed,
                        inc + 1,
                        callback
                    )
                }, speedNumber)
            }
        },
        clickedLeft() {
            this.leftButton = this.leftButton + 1
        },
        clickedCenter() {
            this.centerButton = this.centerButton + 1
        },
        clickedRight() {
            this.rightButton = this.rightButton + 1
        },
        runIdleAnimation(screen) {
            const sequences = [
                [psns1, psns2, psns3, psns0],
                [leftCurl0, leftCurl1, psns0],
                [pullup0, pullup1, pullup0, psns0],
                [dip0, dip1, dip0, psns0],
            ]
            const idleFrames = [highFiveLeft, highFiveRight]

            if (this.storeState.currentGameScreen === screen) {
                //rand sequence
                let randSeq = Math.floor(Math.random() * sequences.length)

                //rand final frame
                store.setValue('isIdleAnimationRunning', true)
                this.stepFrames(
                    'prepperoniFrame',
                    sequences[randSeq],
                    1000,
                    0,
                    () => {
                        store.setValue('isIdleAnimationRunning', false)
                    }
                )
            }
        },
        setCurrentIcon() {
            const gamesObject = {
                DribbleCard: '../assets/pngs/dribbling-icon.png',
                LeadCard: '../assets/pngs/lead-icon.png',
                PowerStartAndStopCard: '../assets/pngs/powersns-icon.png',
                SocializeCard: '../assets/pngs/socialize-icon.png',
                EatCard: '../assets/pngs/steak-icon.png',
                ShootCard: '../assets/pngs/hoop-icon.png',
                LiftCard: '../assets/pngs/lift-icon.png',
                StatsCard: '../assets/pngs/stats-icon.png',
            }
            store.setValue(
                'currentIcon',
                gamesObject[this.storeState.currentGameScreen]
            )
            //get correct icon and set it as storeState.currentIcon
        },
        showIconThenGoToGame() {
            const gamesObject = {
                DribbleCard: '../assets/pngs/dribbling-icon.png',
                LeadCard: '../assets/pngs/lead-icon.png',
                PowerStartAndStopCard: '../assets/pngs/powersns-icon.png',
                SocializeCard: '../assets/pngs/socialize-icon.png',
                EatCard: '../assets/pngs/steak-icon.png',
                ShootCard: '../assets/pngs/hoop-icon.png',
                LiftCard: '../assets/pngs/lift-icon.png',
                StatsCard: '../assets/pngs/stats-icon.png',
            }
            this.setCurrentIcon()
            return new Promise(resolve => resolve())
        },
        transitionFromGame(iconSrc, modString, textArray) {
            //compose Object
            let obj = {
                icon: '',
                mod: '',
                text: [],
            }
            if (iconSrc) {
                obj.icon = iconSrc
            }
            if (modString) {
                obj.mod = modString
            }
            if (textArray) {
                obj.text = [...textArray]
            }
            //then set the object as store.setValue('prevGameData', obj)
            store.setValue('prevGameData', obj, true)
            //then set currentGameScreen to 'ScoreTransCard'
            store.setValue('currentGameScreen', 'ScoreTransCard', true)
        },
        getOffset(element, horizontal = false) {
            if (!element) return 0
            return (
                this.getOffset(element.offsetParent, horizontal) +
                (horizontal ? element.offsetLeft : element.offsetTop)
            )
        },
        innerDimensions(node) {
            var computedStyle = getComputedStyle(node)

            let width = node.clientWidth // width with padding
            let height = node.clientHeight // height with padding

            height -=
                parseFloat(computedStyle.paddingTop) +
                parseFloat(computedStyle.paddingBottom)
            width -=
                parseFloat(computedStyle.paddingLeft) +
                parseFloat(computedStyle.paddingRight)
            return { height, width }
        },
        getInsetScreenDimensions() {
            const theInset = document.querySelector('.inset-screen')
            let inner = this.innerDimensions(theInset)
            let theDimensions = {
                top: this.getOffset(theInset),
                left: this.getOffset(theInset, true),
                width: theInset.offsetWidth,
                height: theInset.offsetHeight,
                innerWidth: inner.width,
                innerHeight: inner.height,
            }
            return theDimensions
        },
        getScreenDimensions(query){
            const theEl = document.querySelector(query)
            let inner = this.innerDimensions(theEl)
            let theDimensions = {
                top: this.getOffset(theEl),
                left: this.getOffset(theEl, true),
                width: theEl.offsetWidth,
                height: theEl.offsetHeight,
                innerWidth: inner.width,
                innerHeight: inner.height,
            }
            return theDimensions
        },
        getInsetScreenDimensionsForCanvas() {
            const theCanvas = document.querySelector('#bg-canvas')
            const theInset = document.querySelector('.inset-screen')
            //get offsets of the canvas to subtract
            let borderOffset = parseInt(
                window
                    .getComputedStyle(theCanvas)
                    .getPropertyValue('border-width')
            )
            console.dir(theCanvas)
            console.log('borderOffset: ' + borderOffset)
            let canvasTopOffset = this.getOffset(theCanvas)
            let canvasLeftOffset = this.getOffset(theCanvas, true)
            let inner = this.innerDimensions(theInset)
            let theDimensions = {
                top:
                    this.getOffset(theInset) - (canvasTopOffset + borderOffset),
                left:
                    this.getOffset(theInset, true) -
                    (canvasLeftOffset + borderOffset),
                width: theInset.offsetWidth,
                height: theInset.offsetHeight,
                innerWidth: inner.width,
                innerHeight: inner.height,
            }
            console.log('canvasInsetDimensions')
            console.log(JSON.stringify(theDimensions))
            return theDimensions
        },
        makeBgTesselation() {
            const images = [
                '45-profile',
                'basketball32',
                'cloud-0',
                'dip-0',
                'dumbbell-icon',
                'egg-0',
                'egg-1',
                'egg-2',
                'egg-3',
                'frontal-base',
                'grave',
                'hatching-0',
                'hatching-1',
                'hatching-2',
                'hatching-3',
                'high-five-high',
                'high-five-left',
                'high-five-low',
                'high-five-right',
                'hoop-icon',
                'lead-icon',
                'left-curl-0',
                'left-curl-1',
                'lift-icon',
                'powersns-icon',
                'psns-0',
                'psns-1',
                'psns-2',
                'psns-3',
                'pullup-0',
                'right-curl-0',
                'right-curl-1',
                'socialize-icon',
                'steak-icon',
            ]
            let rands = images.map(img => {
                return {
                    rand: Math.random(),
                    src: img,
                }
            })
            rands.sort((a, b) => {
                return a.rand - b.rand
            })
            let squared = Math.floor(Math.sqrt(rands.length))
            //make squared rows of squared columns
            let arrayToPass = []
            let randInc = 0
            let spacing = 32
            let negSpace = 16
            for (let rowInc = 0; rowInc < squared; rowInc++) {
                for (let colInc = 0; colInc < squared; colInc++) {
                    randInc++
                    // console.log('randInc: '+randInc)
                    // console.log('rowInc: '+rowInc)
                    // console.log('colInc: '+ colInc)
                    let x = colInc * spacing + colInc * negSpace
                    let y = rowInc * spacing + rowInc * negSpace
                    // if (rowInc % 2 === 1) {
                    //     x += 32
                    // }
                    arrayToPass.push({
                        x: x,
                        y: y,
                        src: `../assets/pngs/${rands[randInc].src}.png`,
                    })
                }
            }
            //make options object
            let optionsObject = {
                width: squared * spacing + squared * negSpace,
                height: squared * spacing + squared * negSpace,
            }
            // console.log(arrayToPass)
            // console.log(optionsObject)
            mergeImages(arrayToPass, optionsObject).then(
                b64 =>
                    (document.getElementById(
                        'outer-frame'
                    ).style.backgroundImage = `url(${b64})`)
            )
        },
        setClickableGameImgSize() {
            let inset = this.getInsetScreenDimensions()
            let pixels = inset.innerHeight * 0.2 + 'px'
            this.clickableGameImgSize
                ? (this.clickableGameImgSize = pixels)
                : null
        },
        
        setImageRendering() {
            this.$nextTick().then(() => {
                console.log('setImageRendering')
                const theInset = document.querySelector('.inset-screen')
                const theImgs = theInset.querySelectorAll('img')
                console.dir(theImgs)
                const threshold = 32
                theImgs.forEach((img, imgIndex) => {
                    const hwObject = { height: img.height, width: img.width }
                    if (img.classList.contains('no-set-image-rendering')) {
                        console.log('no-render ' + JSON.stringify(hwObject))
                        img.style.backgroundColor = 'blue'
                    } else if (
                        img.height < threshold ||
                        img.width < threshold
                    ) {
                        img.style.imageRendering = 'auto'
                        console.log('auto ' + JSON.stringify(hwObject))
                    } else {
                        img.style.imageRendering = 'pixelated'
                        console.log('pixelated ' + JSON.stringify(hwObject))
                    }
                })
            })
        },
        //to call in mounted()
        listen(event, fn) {
            let node
            if (event === 'resize') {
                node = window
            } else {
                node = document
            }
            node.addEventListener(event, fn)
        },
        //to call in beforeDestroy()
        unListen(event, fn) {
            let node
            if (event === 'resize') {
                node = window
            } else {
                node = document
            }
            node.removeEventListener(event, fn)
        },
        calcWidthAndHeightForAspectRatio(outerNode, aspectRatio) {
            //outerNode is the container
            //resizingNode is the node that is being adjusted
            //aspectRatio is a fraction or decimal of width/height

            //first shrink it based on window height
            let firstWidth = outerNode.clientHeight * aspectRatio
            let firstHeight = firstWidth * (1 / aspectRatio)
            let finalWidth = firstWidth
            let finalHeight = firstHeight
            if (firstWidth > outerNode.clientWidth) {
                //if arrives here must make it skinnier and shrink height until it fits
                finalWidth = outerNode.clientWidth - 6
                finalHeight = finalWidth * (1 / aspectRatio)
            }
            const newDimensions = {
                width: finalWidth,
                height: finalHeight,
                aspectRatio: finalWidth / finalHeight,
            }
            return newDimensions
        },
        setLabelText(left, center, right) {
            console.log(left)
            console.log(center)
            console.log(right)
            store.setValue('leftLabelText', left)
            store.setValue('centerLabelText', center)
            store.setValue('rightLabelText', right)
        },
        // getImgUrl(img) {
        //     console.log(img)
        //     var images = require(img)
        //     console.log(images)
        //     return images
        // },
        setDeviceReady() {
            store.setValue('deviceready', true)
            console.log('deviceready')
        }
    },
})
