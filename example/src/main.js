import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = true
// Vue.config.ignoredElements = ['trix-editor']

new Vue({
  render: h => h(App)
}).$mount('#app')
