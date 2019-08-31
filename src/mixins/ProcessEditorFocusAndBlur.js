export default function (component) {
  return {
    methods: {
      processTrixFocus (event) {
        this.isActived = true
        this.$emit('trix-focus', this.$refs.trix.editor, event)
      },
      processTrixBlur (event) {
        this.isActived = false
        this.$emit('trix-blur', this.$refs.trix.editor, event)
      }
    }
  }
}
