/**
 *
 * @param {*} component
 */
export default function (component) {
  return {
    methods: {
      emitSelectionChange (event) {
        this.$emit('trix-selection-change', this.$refs.trix.editor, event)
      }
    }
  }
}
