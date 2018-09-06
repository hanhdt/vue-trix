<template>
  <div class="trix-container">
    <trix-editor :input="inputId" class="trix-content"></trix-editor>
  </div>
</template>

<script>
export default {
  name: 'VueTrix',
  props: {
    inputId: {
      type: String,
      required: false,
      default: ''
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
