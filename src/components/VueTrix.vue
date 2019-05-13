<template>
  <div class="trix-container">
    <trix-editor
      contenteditable="true"
      class="trix-content"
      ref="trix"
      :input="inputId || generateId"
      :placeholder="placeholder"
      @trix-change="handleContentChange"
      @trix-file-accept="emitFileAccept"
      @trix-attachment-add="emitAttachmentAdd"
      @trix-attachment-remove="emitAttachmentRemove"
      @trix-selection-change="emitSelectionChange"
      @trix-initialize="emitInitialize"
      @trix-before-initialize="emitBeforeInitialize"
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
import EmitInitialize from '../mixins/EmitInitialize.js'
import EmitAttachmentAdd from '../mixins/EmitAttachmentAdd.js'
import EmitSelectionChange from '../mixins/EmitSelectionChange.js'
import EmitAttachmentRemove from '../mixins/EmitAttachmentRemove.js'
import EmitBeforeInitialize from '../mixins/EmitBeforeInitialize.js'

export default {
  name: 'VueTrix',
  mixins: [
    EmitFileAccept('VueTrix'),
    EmitInitialize('VueTrix'),
    EmitAttachmentAdd('VueTrix'),
    EmitSelectionChange('VueTrix'),
    EmitAttachmentRemove('VueTrix'),
    EmitBeforeInitialize('VueTrix')
  ],
  model: {
    prop: 'srcContent',
    event: 'update'
  },
  props: {
    /**
     * This is referenced `id` of the hidden input field defined.
     * It is optional and will be a random string by default.
     */
    inputId: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    /**
     * This is referenced `name` of the hidden input field defined,
     * default value is `content`.
     */
    inputName: {
      type: String,
      required: false,
      default () {
        return 'content'
      }
    },
    /**
     * The placeholder attribute specifies a short hint
     * that describes the expected value of a editor.
     */
    placeholder: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    /**
     * The source content is associcated to v-model directive.
     */
    srcContent: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    /**
     * The boolean attribute allows saving editor state into browser's localStorage
     * (optional, default is `false`).
     */
    localStorage: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    /**
     * The function to call when editor is focused (optional).
     */
    trixFocus: {
      type: Function,
      required: false,
      default: () => {
      }
    },
    /**
     * The function to call when editor goes out of focus (optional).
     */
    trixBlur: {
      type: Function,
      required: false,
      default: () => {
      }
    }
  },
  created () {
    /**
     *  If localStorage is enabled,
     *  then load editor's content from the beginning.
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
      this.$refs.trix.editor.setSelectedRange(this.getCurrentPosition())
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
    },
    getCurrentPosition () {
      return this.$refs.trix.editor.getDocument().toString().length - 1
    }
  },
  computed: {
    /**
     * Compute a random id of hidden input
     * when it haven't been specified.
     */
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

<style lang="css" scoped>
.trix-container {
  max-width: 100%;
  height: auto;
}
</style>
