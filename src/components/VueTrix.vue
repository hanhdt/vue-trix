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
      @trix-focus="trixFocus"
      @trix-blur="trixBlur"
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
    prop: 'srcContent',
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
    srcContent: {
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
    },
    trixFocus:{
      type: Function,
      required:false,
      default:()=>{

      }
    },
    trixBlur:{
      type: Function,
      required:false,
      default:()=>{

      }
    }
  },
  created () {
    /* If localStorage is enabled,
     *  then load editor's content from the beginning
     */
    if (this.localStorage) {
      const savedValue = localStorage.getItem(this.storageId('VueTrix'))
      if (savedValue && !this.srcContent) {
        this.$refs.trix.editor.loadJSON(JSON.parse(savedValue))
      }
    }
  },
  data () {
    return {
      editorContent: this.srcContent
    }
  },
  methods: {
    handleContentChange (event) {
      this.editorContent = event.srcElement ? event.srcElement.innerHTML : event.target.innerHTML
    },
    handleInitialContentChange (newContent, oldContent) {
      // Update editor's content when initial content changed
      this.editorContent = newContent
      this.$refs.trix.editor.loadHTML(this.editorContent)
      // Move cursor to end of new content updated
      let editorLength = this.$refs.trix.editor.getDocument().toString().length
      this.$refs.trix.editor.setSelectedRange(editorLength - 1)
    },
    emitEditorState (val) {
      /** 
       * If localStorage is enabled,
       * then save editor's content into storage
       */
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
    },
    initialContent () {
      return this.srcContent
    }
  },
  watch: {
    editorContent: {
      handler: 'emitEditorState'
    },
    initialContent: {
      handler: 'handleInitialContentChange'
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
