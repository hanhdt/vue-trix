/**
 *
 * @param {*} component
 */
export default function (component) {
  return {
    methods: {
      emitBeforeInitialize (event) {
        this.$emit('trix-before-initialize', this.$refs.trix.editor, event)
      }
    }
  }
}
