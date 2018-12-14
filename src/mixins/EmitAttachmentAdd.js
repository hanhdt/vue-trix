/**
 *
 * @param {*} component
 */
export default function (component) {
  return {
    methods: {
      emitAttachmentAdd (file) {
        this.$emit('trix-attachment-add', file)
      }
    }
  }
}
