<template>
    <div 
    id="eat-card"
    @click="e=>onClick(e)"
    >
        <div class="h-full">
            <MushyText
                class="margin-centered"
                :heightPercent="10"
                :widthPercent="100"
                :text="score"
            ></MushyText>
            <div id="moving-food" class="spinning-clockwise" :style="clickableCss">
                <img id="food-img" :src="foodImg" />
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
import { audio } from '../mixins/audio.js'

const steakImg = require('../assets/pngs/steak-icon.png')
const cloud2 = require('../assets/pngs/cloud-2.png')
export default {
    name: 'EatCard',
    mixins: [tama, audio],
    components: {},
    props: {},
    data() {
        return {
            storeState: store.state,
            score: 0,
            gameRegister: [],
            foodImg: steakImg,
            clickableGameImgSize: '150px'
        }
    },
    methods: {
        endGame() {
            let mod = '+1'
            if (this.score > 20) {
                store.setValue('belly', this.storeState.belly + 1 || 1, true)
                mod = '+2'
            }
            this.transitionFromGame(require('../assets/pngs/steak-icon.png'), mod, [
                `score: ${this.score}`,
            ])
        },
        randomPxUpTo(max, foodPx) {
            return Math.random() * (max - foodPx) + 'px'
        },
        clickedFood() {
            this.score++
            this.foodImg = cloud2
            this.playSfx('eatTouchFood')
            this.storeState.foodTimeout = setTimeout(() => {
                this.foodImg = steakImg
                this.setNewFoodPosition()
            }, 125)
        },
        missedFood() {
            this.playSfx('eatTouchMiss')
        },
        setNewFoodPosition() {
            console.log('running set food')
            let theFood = document.getElementById('moving-food')
            if (theFood) {                
                const foodWidth = theFood.clientWidth
                const foodHeight = theFood.clientHeight
                const foodCard = this.getScreenDimensions('#eat-card')
                theFood.style.top = this.randomPxUpTo(foodCard.innerHeight, foodHeight)
                theFood.style.left = this.randomPxUpTo(foodCard.innerWidth, foodWidth)
            }
        },
        onResize() {
            this.setNewFoodPosition()
            this.setClickableGameImgSize()
            this.setImageRendering()
        },
        onClick(e) {
            // console.log('dribbleClick')
            // console.log(e)
            if (e.target.id === 'food-img') {
                console.log('hit')
                this.clickedFood()
            } else {
                this.missedFood()
                console.log('miss')
            }
        }
    },
    mounted() {
        this.listen('resize', this.onResize)
        this.setClickableGameImgSize()
        this.setNewFoodPosition()
        setTimeout(() => {
            this.endGame()
        }, 30000)
        this.setLabelText("***", "***", "***")
    },
    beforeDestroy() {
        this.unListen('resize', this.onResize)
    },
    computed: {
        clickableCss() {
            return {
                height: this.clickableGameImgSize,
                width: this.clickableGameImgSize
            }
        }
    }
}
</script>

<style scoped>
#moving-food {
    position: absolute;
    height: 32px;
    width: 32px;
    margin: 0;
}

#food-img {
    width: 100%;
    height: 100%;
}
</style>