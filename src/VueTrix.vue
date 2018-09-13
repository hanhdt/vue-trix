<template>
  <div class="trix-container">
    <trix-editor
      :input="inputId"
      class="trix-content"
      ref="trix"
      @input="update">
    </trix-editor>
    <input type="hidden" :id="inputId" name="content">
  </div>
</template>

<script>
import 'trix'
import 'trix/dist/trix.css'

export default {
  name: 'VueTrix',
  model: {
    prop: 'initial',
    event: 'update'
  },
  props: {
    inputId: {
      type: String,
      required: false,
      default: ''
    },
    initial: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted () {
    this.$refs.trix.editor.insertHTML(this.initial)
    this.$refs.trix.addEventListener('trix-initialize', this.update)
  },
  methods: {
    update () {
      this.$emit('update', this.htmlContent())
    },
    htmlContent () {
      return document.querySelector(`#${this.inputId}`).value
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
