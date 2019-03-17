import vue from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs';

const config = require('../package.json')

export default {
  input: 'src/index.js',
  name: 'VueTrix',
  plugins: [
    commonjs(),
    vue({
      compileTemplate: true,
      css: true
    }),
    replace({
      VERSION: JSON.stringify(config.version)
    }),
    buble()
  ]
}
