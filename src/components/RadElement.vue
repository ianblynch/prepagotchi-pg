<template>
    <div
        :class="compClasses"
        :is="element.type"
        :element="element"
        :src="compSrc"
        :globals="globals"
        :leftButton="leftButton"
        :centerButton="centerButton"
        :rightButton="rightButton"
        :availableActions="availableActions"
        @click="compClickFunction"
        @emit-set-new-card-and-branch="emitSetNewCardAndBranch(...arguments)"
        @emit-update-global="emitUpdateGlobal(...arguments)"
    >
    <span v-if="compText">
        {{compText}}
    </span>
        <template v-if="element.children">
            <RadElement
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
    </div>
</template>

<script>
import { global } from '../mixins/global.js'
import { compValues } from '../mixins/compValues.js'
import CardHeader from './CardHeader.vue'
import CardBody from './CardBody.vue'
import CardPath from './CardPath.vue'
import RadElement from './RadElement.vue'
export default {
    name: "RadElement",
    mixins: [global, compValues],
    components: {
        CardHeader,
        CardBody,
        CardPath,
        RadElement
    },
    props: {
        globals: {
            type: Object
        },
        availableActions: {
            type: Object
        },
        rightButton: {
            type: Number
        },
        leftButton: {
            type: Number
        },
        centerButton: {
            type: Number
        }
    }
}
</script>

<style scoped>

</style>