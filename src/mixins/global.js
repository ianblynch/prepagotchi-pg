import ls from 'local-storage'
export const global = {
    props: {
        storyData: {
            type: Object
        },
        appData: {
            type: Object
        },
        radiation: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        findCardInstanceIndexFromId(id) {
            return this.storyData.cardInstances.findIndex(obj => {
                return obj.id === id
            })
        },
        emitSetNewCardAndBranch(branchId) {
            this.$emit('emit-set-new-card-and-branch', branchId)
        },
        setNewCardAndBranch(newPathId, isStartOver) {
            let ciIndex = this.findCardInstanceIndexFromId(newPathId)
            if (isStartOver) {
                ciIndex = 0
            }
            this.currentBranch = this.storyData.cardInstances[ciIndex]
        },
        toggleRadiation() {
            this.radiation = !this.radiation
        },
        emitUpdateGlobal(...params) {
            this.$emit('emit-update-global', ...params)
        },
        updateGlobal(action, name, operation, value, subObject) {

            let currentValue
            let newValue
            let registerObject = {time: new Date().getTime()}
            //build registerObject
            if (action) {
                registerObject.action = action
            }
            if (name) {
                registerObject.name = name
            }
            if (operation) {
                registerObject.operation = operation
            }
            if (value) {
                registerObject.value = value
            }
            if (subObject) {
                registerObject.subObject = subObject
            }
            if (!subObject) {
                if(this.globals[name]) {
                    currentValue = this.globals[name]
                } else {
                    currentValue = 0
                }
                if (operation === 'add') {
                    newValue = currentValue + value
                } else if (operation === 'subtract') {
                    newValue = currentValue - value
                }
                registerObject.oldValue = currentValue
                registerObject.newValue = newValue
                this.$set(this.globals, name, newValue)
            } else if (subObject && typeof subObject === 'string'){
                if(this.globals[subObject][name]) {
                    currentValue = this.globals[subObject][name]
                } else {
                    currentValue = 0
                }
                if (operation === 'add') {
                    newValue = currentValue + value
                } else if (operation === 'subtract') {
                    newValue = currentValue - value
                }
                if (!this.globals[subObject].register) {
                    this.$set(this.globals[subObject], 'register', [])
                }
                registerObject.oldValue = currentValue
                registerObject.newValue = newValue
                this.$set(this.globals[subObject], name, newValue)
                this.globals[subObject].register.push(registerObject)
                this.saveLS(subObject, this.globals[subObject])
            }
        },
        resetGlobal(resetObject, name) {
            console.log(resetObject)
            console.log(name)
            
            if(resetObject === "emptyObject"){
                this.saveLS(name, {})
                this.$set(this.globals, name, {})

            }
        },
        initializeLS(name) {
            if(!ls(name)) {
                ls(name, {
                    fuel: 0,
                    refuel: 0,
                    power: 0,
                    will: 0,
                    brain: 0,
                    stamina: 0,
                    register: []
                })
            }
            let dragonInfo = ls(name)
            this.$set(this.globals, name, dragonInfo)
        },
        saveLS(key, info) {
            ls(key, info)
        },
        loadLS(key) {
            ls(key)
        }
    }
}