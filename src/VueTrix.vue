<template>
  <div class="trix-container">
    <trix-editor
      :input="inputId || randomId"
      class="trix-content"
      ref="trix"
      @trix-change="update">
    </trix-editor>
    <input
      type="hidden"
      name="content"
      :id="inputId || randomId"
      :value.prop="content">
  </div>
</template>

<script>
import 'trix'
import 'trix/dist/trix.css'

export default {
  name: 'VueTrix',
  model: {
    prop: 'content',
    event: 'update'
  },
  props: {
    inputId: {
      type: String,
      required: false,
      default: ''
    },
    content: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted () {
    this.$refs.trix.addEventListener('trix-initialize', this.update)
  },
  methods: {
    update (event) {
      this.$emit('update', event.currentTarget.value || '')
    }
  },
  computed: {
    randomId () {
      let text = ''
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      return text
    }
  }
}
</script>

<style lang="scss" scoped>
.trix-container {
  max-width: 100%;
  height: auto;
}
</style>
