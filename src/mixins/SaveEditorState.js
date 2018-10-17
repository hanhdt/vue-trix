/**
 * Persist editor's state
 */
export default function (component) {
  return {
    methods: {
      // Save editor data with elementId
      saveAllEditorData () {
        localStorage.setItem(this.storageId(), JSON.stringify(this.$refs.trix.editor))
      },
      storageId () {
        if (this.$props.inputId) {
          return `${component}.${this.$props.inputId}.content`
        } else {
          return `${component}.content`
        }
      }
    },
    beforeDestroy () {
      this.saveAllEditorData()
    },
    mounted () {
      const savedValue = localStorage.getItem(this.storageId())
      if (savedValue && !this.$props.initContent) {
        this.$refs.trix.editor.loadJSON(JSON.parse(savedValue))
      }
    },
    watch: {
      initContent: function (val) {
        localStorage.setItem(this.storageId(), JSON.stringify(this.$refs.trix.editor))
      }
    }
  }
}
