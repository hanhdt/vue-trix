<template>
  <div class="trix-container">
    <trix-editor
      class="trix-content"
      ref="trix"
      :input="inputId || generateId"
      :placeholder="placeholder"
      @trix-change="handleContentChange"
      @trix-file-accept="emitFileAccept"
      @trix-attachment-add="emitAttachmentAdd"
      @trix-attachment-remove="emitAttachmentRemove"
    ></trix-editor>
    <input
      type="hidden"
      :name="inputName"
      :id="inputId || generateId"
      :value="editorContent"
    >
  </div>
</template>

<script>
import 'trix'
import 'trix/dist/trix.css'
import EmitFileAccept from '../mixins/EmitFileAccept.js'
import EmitAttachmentAdd from '../mixins/EmitAttachmentAdd.js'
import EmitAttachmentRemove from '../mixins/EmitAttachmentRemove.js'

export default {
  name: 'VueTrix',
  mixins: [
    EmitFileAccept('VueTrix'),
    EmitAttachmentAdd('VueTrix'),
    EmitAttachmentRemove('VueTrix')
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
    inputName: {
      type: String,
      required: false,
      default () {
        return 'content'
      }
    },
    placeholder: {
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
    },
    localStorage: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    }
  },
  created () {
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
    handleContentChange (event) {
      this.editorContent = event.srcElement ? event.srcElement.innerHTML : event.target.innerHTML
    },
    handleInitContentChange (newVal, oldVal) {
      this.editorContent = newVal
      this.$refs.trix.editor.loadHTML(this.editorContent)
    },
    emitEditorState (val) {
      if (this.localStorage) {
        localStorage.setItem(
          this.storageId('VueTrix'),
          JSON.stringify(this.$refs.trix.editor)
        )
      }
      this.$emit('update', this.editorContent)
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
      handler: 'emitEditorState'
    },
    initContent: {
      handler: 'handleInitContentChange'
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
