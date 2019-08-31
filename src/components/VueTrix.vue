<template>
  <div :class="[$style.trix_container]">
    <trix-editor
      :contenteditable="!disabledEditor"
      :class="['trix-content']"
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
    />
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
     * This prop will put the editor in read-only mode
     */
    disabledEditor: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
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
  mounted () {
    /** Check if editor read-only mode is required */
    this.decorateDisabledEditor()
  },
  data () {
    return {
      editorContent: this.srcContent
    }
  },
  methods: {
    handleContentChange (event) {
      this.editorContent = event.srcElement ? event.srcElement.innerHTML : event.target.innerHTML
      this.$emit('input', this.editorContent)
    },
    handleInitialContentChange (newContent, oldContent) {
      newContent = newContent === undefined ? '' : newContent

      if (this.$refs.trix.editor.innerHTML !== newContent) {
        // Update editor's content when initial content changed
        this.editorContent = newContent
        // FIXME: should keep cursor position after refresh the editor's content.
        this.reloadEditorContent(this.editorContent)
      }
    },
    emitEditorState (value) {
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
    reloadEditorContent (newContent) {
      // Reload HTML content
      this.$refs.trix.editor.loadHTML(newContent)

      // Move cursor to end of new content updated
      this.$refs.trix.editor.setSelectedRange(this.getContentEndPosition())
    },
    getContentEndPosition () {
      return this.$refs.trix.editor.getDocument().toString().length - 1
    },
    decorateDisabledEditor () {
      /** Disable toolbar and editor by pointer events styling */
      if (this.disabledEditor) {
        document.querySelector('trix-toolbar').style['pointer-events'] = 'none'
        document.querySelector('trix-editor').style['pointer-events'] = 'none'
        document.querySelector('trix-editor').style['background'] = '#ecf0f1'
      }
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

<style lang="css" module>
.trix_container {
  max-width: 100%;
  height: auto;
}
.trix_container .trix-button-group {
  background-color: white;
}
.trix_container .trix-content {
  background-color: white;
}
</style>
