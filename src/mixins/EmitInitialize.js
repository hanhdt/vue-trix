/**
 *
 * @param {*} component
 */
export default function (component) {
  return {
    methods: {
      emitInitialize (editor) {
        this.$emit('trix-initialize', this.$refs.trix.editor, event)
      }
    }
  }
}
