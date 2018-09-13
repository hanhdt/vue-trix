<template>
  <div class="container">
    <div class="editor-wrapper">
      <h2>1. Creating a simple editor</h2>
      <VueTrix v-model="content1"/>
    </div>
    <hr>
    <div class="form-wrapper">
      <h2>2. Integrating with Forms</h2>
      <form>
        <VueTrix inputId="textarea2" v-model="content2"/>
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
      content1: 'content #1',
      content2: 'content #2'
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
