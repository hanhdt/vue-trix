export default function (component) {
  return {
    methods: {
      processTrixFocus (event) {
        if (this.$refs.trix) {
          this.isActived = true
          this.$emit('trix-focus', this.$refs.trix.editor, event)
        }
      },
      processTrixBlur (event) {
        if (this.$refs.trix) {
          this.isActived = false
          this.$emit('trix-blur', this.$refs.trix.editor, event)
        }
      }
    }
  }
}
