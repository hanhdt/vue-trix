/*
 * Vue-Trix index.js
 * Author: tranduchanh.ms@gmail.com
 * Github: https://github.com/hanhdt/vue-trix
 */

import Vue from 'vue'
import VueTrix from './components/VueTrix.vue'

Vue.config.ignoredElements = ['trix-editor']
Vue.component(VueTrix.name, VueTrix)

const VueTrixPlugin = {
  install (app, options) {
    if (!options) {
      options = {};
    }
    app.config.compilerOptions.isCustomElement = tag => tag === 'trix-editor'
    app.component('vue-trix', VueTrix);
  }
};

export default VueTrixPlugin;
