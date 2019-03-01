/**
 *
 * @param {*} component
 */
export default function (component) {
  return {
    methods: {
      emitFileAccept (file) {
        this.$emit('trix-file-accept', file)
      }
    }
  }
}
