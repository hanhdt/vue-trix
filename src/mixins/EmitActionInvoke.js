/**
 *
 * @param {*} component
 */
export default function (component) {
  return {
    methods: {
      emitActionInvoke (event) {
        this.$emit('trix-action-invoke', event)
      }
    }
  }
}
