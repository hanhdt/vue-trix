import vue from 'rollup-plugin-vue'

export default [
  {
    input: 'src/components/VueTrix.vue',
    output: {
      format: 'esm',
      name: 'VueTrix',
      file: 'dist/vue-trix.esm.js'
    },
    plugins: [
      vue()
    ]
  },
  // Browser build.
  {
    input: 'src/components/VueTrix.vue',
    output: {
      format: 'iife',
      name: 'VueTrix',
      file: 'dist/vue-trix.min.js'
    },
    plugins: [
      vue()
    ]
  }
]
