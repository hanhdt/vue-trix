<template>
  <div class="container">
    <div class="editor-wrapper">
      <h2>Creating an editor</h2>
      <VueTrix/>
    </div>
    <div class="form-wrapper">
      <h2>Integrating with Forms</h2>
      <form>
        <input id="inputTextarea" type="hidden" name="content">
        <VueTrix inputId="inputTextarea"/>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Editor'
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
