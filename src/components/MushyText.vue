<template>
    <div :id="uuid" :style="heightAndWidthStyleObject" v-text="text">
    </div>
</template>

<script>
import textFit from 'textfit'
import uuid from 'uuid'
import { store } from '../data/store.js'
import { tama } from '../mixins/tama.js'

export default {
    name: 'MushyText',
    mixins: [tama],
    props: {
        text: {
            default() {
                return ''
            }
        },
        heightPercent: {
            type: Number,
            default() {
                return 10
            }
        },
        widthPercent: {
            type: Number,
            default() {
                return 80
            }
        }
    },
    data() {
        return {
            storeState: store.state,
            height: '',
            width: '',
            uuid: ''
        }
    },
    methods: {
        fit() {
            textFit([document.getElementById(this.uuid)], {
                multiLine: false,
                alignHoriz: true,
                alignVert: true,
                maxFontSize: 20,
            })
        },
        setHeightAndWidth() {
            let insetDimensions = this.getInsetScreenDimensions()
            this.height = insetDimensions.innerHeight * (this.heightPercent/100)
            this.width = insetDimensions.innerWidth * (this.widthPercent/100)
        },
        setUuid() {
            this.uuid = uuid()
        }
    },
    computed: {
        heightAndWidthStyleObject() {
            return {
                height: this.height + 'px',
                width: this.width + 'px'
            }
        }
    },
    watch: {
        'storeState.insetMirrorCss': {
            deep: true,
            handler() {
                this.setHeightAndWidth()
            },
        }
    },
    mounted() {
        this.setUuid()
        this.setHeightAndWidth()
        this.fit()
    },
    updated() {
        this.fit()
    }
}
</script>