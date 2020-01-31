import Vue from 'vue'
import App from './App.vue'
import './assets/css/tailwind.min.css'
import './components'
import { store } from './data/store.js'


Vue.config.productionTip = false

let wrapper

function onDeviceReady() {  
  store.setValue('deviceready', true)
  console.log('deviceready')
  wrapper = new Vue({
    render: h => h(App)
  }).$mount('#app')
}
document.addEventListener('deviceready', onDeviceReady)