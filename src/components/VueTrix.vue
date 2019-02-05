<template>
  <div class="trix-container">
    <trix-editor
      class="trix-content"
      ref="trix"
      :input="inputId || generateId"
      :placeholder="placeholder"
      @trix-change="update"
      @trix-attachment-add="emitAttachmentAdd"
      @trix-attachment-remove="emitAttachmentRemove"
    ></trix-editor>
    <input
      type="hidden"
      :name="inputName"
      :id="inputId || generateId"
      :value.prop="initContent"
      @input="update"
    >
  </div>
</template>

<script>
import 'trix'
import 'trix/dist/trix.css'
import EmitAttachmentAdd from '../mixins/EmitAttachmentAdd.js'
import EmitAttachmentRemove from '../mixins/EmitAttachmentRemove.js'

export default {
  name: 'VueTrix',
  mixins: [EmitAttachmentAdd('VueTrix'), EmitAttachmentRemove('VueTrix')],
  model: {
    prop: 'editorContent',
    event: 'update'
  },
  props: {
    inputId: {
      type: String,
      required: false,
      default: ''
    },
    inputName: {
      type: String,
      required: false,
      default: 'content'
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    initContent: {
      type: String,
      required: false,
      default: ''
    },
    localStorage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted () {
    if (this.localStorage) {
      const savedValue = localStorage.getItem(this.storageId('VueTrix'))
      if (savedValue && !this.initContent) {
        this.$refs.trix.editor.loadJSON(JSON.parse(savedValue))
      }
    }
  },
  data () {
    return {
      editorContent: this.initContent
    }
  },
  methods: {
    update (event) {
      this.$emit('update', event.srcElement.innerHTML)
    },
    saveEditorState (val) {
      if (this.localStorage) {
        localStorage.setItem(
          this.storageId('VueTrix'),
          JSON.stringify(this.$refs.trix.editor)
        )
      }
    },
    storageId (component) {
      if (this.inputId) {
        return `${component}.${this.inputId}.content`
      } else {
        return `${component}.content`
      }
    }
  },
  computed: {
    generateId () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        var r = Math.random() * 16 | 0
        var v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
  },
  watch: {
    editorContent: {
      handler: 'saveEditorState'
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
