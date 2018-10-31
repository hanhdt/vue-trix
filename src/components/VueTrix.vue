<template>
  <div class="trix-container">
    <trix-editor
      :input="inputId || randomId"
      class="trix-content"
      ref="trix"
      @trix-change="update"
      @trix-file-accept="emitHandleFile">
    </trix-editor>
    <input
      type="hidden"
      name="content"
      :id="inputId || randomId"
      :value.prop="initContent">
  </div>
</template>

<script>
import Vue from 'vue'
import 'trix'
import 'trix/dist/trix.css'
import SaveEditorState from '../mixins/SaveEditorState.js'
import EmitDroppedFile from '../mixins/EmitDroppedFile.js'
Vue.config.ignoredElements = ['trix-editor']

export default {
  name: 'VueTrix',
  mixins: [
    SaveEditorState('VueTrixEditor'),
    EmitDroppedFile('VueTrixEditor')
  ],
  model: {
    prop: 'initContent',
    event: 'update'
  },
  props: {
    inputId: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    initContent: {
      type: String,
      required: false,
      default () {
        return ''
      }
    }
  },
  methods: {
    update (event) {
      this.$emit('update', event.srcElement.innerHTML)
    }
  },
  computed: {
    randomId () {
      let text = ''
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
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
