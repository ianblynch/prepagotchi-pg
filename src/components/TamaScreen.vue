<template>
    <div
        class="inset-screen tama-screen pixelated"
        v-bind:is="storeState.currentGameScreen"
        :style="insetCSS"
    >
    </div>
</template>

<script>
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'
export default {
    name: "TamaScreen",
    mixins: [tama],
    data() {
        return {
            storeState: store.state,
            insetCSS: {}
        }
    },
    methods: {
        setInsetScreenDimensions() {
                const theInset = document.querySelector('.inset-screen')
                let inner = this.innerDimensions(theInset)
                store.setValue('insetScreenDimensions', {
                top: this.getOffset(theInset),
                left: this.getOffset(theInset, true),
                width: theInset.offsetWidth,
                height: theInset.offsetHeight,
                innerWidth: inner.width,
                innerHeight: inner.height
            })
        }
    },
    watch: {
        'storeState.insetMirrorCss': {
            deep: true,
            handler() {
                this.insetCSS = this.storeState.insetMirrorCss
                this.setInsetScreenDimensions()
            }
        }
    },
    mounted() {
        this.setInsetScreenDimensions()
    }
}
</script>

<style scoped>

</style>