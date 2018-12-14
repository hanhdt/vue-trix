/**
 *
 * @param {*} component
 */
export default function (component) {
  return {
    methods: {
      emitAttachmentRemove (file) {
        this.$emit('trix-attachment-remove', file)
      }
    }
  }
}
