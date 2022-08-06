/*
 * Vue-Trix index.js
 * Author: tranduchanh.ms@gmail.com
 * Github: https://github.com/hanhdt/vue-trix
 */

import VueTrix from './components/VueTrix.vue'

const VueTrixPlugin = {
  install (app, options) {
    if (!options) {
      options = {};
    }
    app.config.compilerOptions.isCustomElement = tag => tag === 'trix-editor'
    app.config.ignoredElements = ['trix-editor']

    app.component('vue-trix', VueTrix);
  }
};

export default VueTrixPlugin;
