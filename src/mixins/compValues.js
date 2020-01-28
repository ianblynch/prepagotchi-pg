import uuid from 'uuid'
export const compValues = {
    props: {
        element: {
            type: Object
        }
    },
    methods: {
        emitSetNewCardAndBranch(branchId) {
            this.$emit('emit-set-new-card-and-branch', branchId)
        },
        emitUpdateGlobal(...params) {
            this.$emit('emit-update-global', ...params)
        }
    },
    computed: {
        compSrc() {
            if (this.element.src) {
                return this.element.src
            } else return false
        },
        compKeys() {
            if (this.element.children) {
                let array = []
                this.element.children.forEach(function() {
                    array.push(uuid())
                })
                return array
            } else return []
        },
        compClickFunction() {
            let click0 = function() {return}
            let click1 = function() {return}
            if (this.element.clickFunction) {
                if (this.element.clickFunction.name === 'emitUpdateGlobal' && this.element.clickFunction.params) {
                    click0 = () => {
                        this.emitUpdateGlobal(...this.element.clickFunction.params)
                    }
                } else if (this.element.clickFunction.name === 'resetGlobal' && this.element.clickFunction.params) {
                    click0 = () => {
                        this.resetGlobal(...this.element.clickFunction.params)
                    }
                }
            } 
            if (this.element.goToCard) {
                click1 = () => {
                    this.emitSetNewCardAndBranch(this.element.goToCard)
                }
            }  
            let compositeFunc = () => {
                click0()
                click1()
            }
            return compositeFunc
        },
        compClasses() {
            if (this.element.classes) {
                return this.element.classes
            } else return []
        },
        compText() {
            if (this.element.text) {
                return this.element.text
            } else return false
        }
    }
}