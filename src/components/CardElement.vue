<template>

    <div
        v-if="typeof element === 'string'"
        class="card-element--container string"
        @click="clickCallback"
    >
        <span
            v-if="defaults && defaults.text && defaults.text.template"
            :is="defaults.text.template"
            class="card-element--text"
        >{{ element }}</span>
        <span
            v-else
            class="card-element--text"        
        >{{ element }}</span>
    </div>

    <div
        v-else
        class="card-element--container object"
        @click="clickCallback"
    >

        <span
            v-if="element.text && !element.template && !element.html"
            class="card-element--text"
        >{{ element.text }}</span>

        <span
            v-if="element.html && !element.text && !element.template"
            v-html="element.html"
            class="card-element--html"
        ></span>

        <div
            v-if="element.template"
            :is="element.template"
            class="card-element--template"
        >
            <span
                v-if="element.html"
                v-html="element.html"
                class="card-element--html"
            ></span>
            <span
                v-if="element.text"
                class="card-element--text"
            >{{ element.text }}</span>
        </div>
    </div>
</template>

<script>

// import { global } from '../mixins/global.js'
// import { compValues } from '../mixins/compValues.js'
import { store } from '../data/store.js'

export default {
    name: "CardElement",
    // mixins: [global, compValues],
    props: {
        element: {
            type: undefined,
            default: ''
        },
        defaults: {
            type: Object,
            default: undefined
        }
    },
    data() {
        return {
            storeState: store.state
        }
    },
    mounted() {
        this.element.mounted && this.element.mounted()
    },
    methods: {
        goToCard(cardInstance) {
            console.log('goToCard', cardInstance)
            store.setValue('currentCardInstance', cardInstance, true)
            document.querySelector('.app-container').scrollTop = 0
        },
        clickCallback() {
            console.log('clickCallback')
            this.element.goTo && this.goToCard(this.element.goTo)
            this.element.callback && this.element.callback()
        }
    }
}
</script>