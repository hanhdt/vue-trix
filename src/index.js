import 'trix'
import 'trix/dist/trix.css'
import Vue from 'vue'
import VueTrix from './VueTrix.vue'

const Components = {
  VueTrix
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
