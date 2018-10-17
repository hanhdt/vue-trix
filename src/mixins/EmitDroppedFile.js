/**
 *
 * @param {*} component
 */
export default function (component) {
  return {
    methods: {
      emitHandleFile (file) {
        this.$emit('trix-file-accept', file)
      }
    }
  }
}
