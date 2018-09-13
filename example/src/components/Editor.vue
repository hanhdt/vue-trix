<template>
  <div class="container">
    <div class="editor-wrapper">
      <h2>1. Creating an editor</h2>
      <VueTrix />
    </div>
    <hr>
    <div class="form-wrapper">
      <h2>2. Integrating with Forms</h2>
      <form>
        <VueTrix inputId="textarea2" v-model="textareaContent"/>
      </form>
    </div>
  </div>
</template>

<script>
import VueTrix from '../../../src/VueTrix'

export default {
  name: 'Editor',
  data () {
    return {
      textareaContent: 'test'
    }
  },
  components: {
    VueTrix
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 100%;
  padding: 30px 0;
}
.editor-wrapper, .form-wrapper {
  max-width: 700px;
}
</style>
