import { tamaInitialStore, persistingStateKeys } from './tamaInitialStore.js'

export const store = {
    state: {
      ...tamaInitialStore,
      mascot: 'pending...'
    },
    setValue(key, value, ls) {
      this.state[key] = value;
      if (ls && this.state.game && this.state.useLocalStorage) {
        this.saveLS(this.state.game, JSON.stringify(this.state))
      }
    },
    getValue(key) {
        return this.state[key]
    },
    getState() {
        return this.state
    },
    saveLS(key, value) {
      localStorage.setItem(key, value)
    },
    loadLS(key){
      console.log('loading')
      //should load in ls data
      let loaded = localStorage.getItem(key)
      loaded = JSON.parse(loaded)
      if (typeof loaded === 'number' || typeof loaded === 'string' || typeof loaded === 'boolean') {
        
        this.state[key] = loaded;
        } else if (typeof loaded === 'object' && loaded != null) {
      //make newStateObject as copy of tamaInitialStore
      let newStateObject = {...tamaInitialStore}
      //loop through Object.keys(onlyPersistingKeys) and replace in newStateObject
      let onlyPersistingKeys = {}
      persistingStateKeys.forEach(sk => {
        if (loaded[sk] && loaded[sk] !== null && loaded[sk] !== undefined)
        onlyPersistingKeys[sk] = loaded[sk]
      })
      console.log('opk')
      console.log(JSON.stringify(onlyPersistingKeys))
      Object.keys(onlyPersistingKeys).forEach(pk => {
        newStateObject[pk] = onlyPersistingKeys[pk]
      })
      //set this.state = {...newStateObject}
      // this.state = {...newStateObject}
      Object.keys(newStateObject).forEach(k => {
        this.setValue(k, newStateObject[k])
      })
      }
    },
    clearLS() {
      localStorage.clear()
    }
  };