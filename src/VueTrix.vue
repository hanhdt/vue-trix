<template>
  <div class="trix-container">
    <trix-editor :input="inputId" class="trix-content" name="trix-editor"></trix-editor>
  </div>
</template>

<script>
import _Trix from 'trix'
import 'trix/dist/trix.css'

const Trix = window.Trix || _Trix

export default {
  name: 'VueTrix',
  props: {
    inputId: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    // Init Trix instance
    initialize () {
      if (this.$el) {
        // Instance
        this.trix = Trix.editor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.trix-container {
  max-width: 100%;
  height: auto;
}
</style>
