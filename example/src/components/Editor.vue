<template>
  <div class="container">
    <div class="editor-wrapper">
      <h2>1. A simple text editor</h2>
      <VueTrix
        v-model="content1"
        placeholder="Enter your content"
        localStorage
        @trix-file-accept="handleFile"
        @trix-attachment-add="handleAttachmentAdd"
        @trix-attachment-remove="handleAttachmentRemove"
      />
    </div>
    <hr>
    <div class="form-wrapper">
      <h2>2. Integrating with Forms</h2>
      <form>
        <input type="text" name="title" id="title" placeholder="enter title...">
        <VueTrix inputId="textarea2" :inputName="inputName" v-model="content2"/>
        <button>Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import VueTrix from "../../../dist/vue-trix.esm.js";

export default {
  name: "Editor",
  props: {
    inputName: {
      type: String,
      required: false,
      default: "content"
    }
  },
  data() {
    return {
      content1: "<h1>here is heading</h1>",
      content2: "<blockquote>description content</blockquote>"
    };
  },
  methods: {
    handleFile(file) {
      console.log("Drop file", file);
    },
    handleAttachmentAdd(file) {
      console.log("Upload file:", file);
    },
    handleAttachmentRemove(file) {
      console.log("Remove file:", file);
    }
  },
  components: {
    VueTrix
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 100%;
  padding: 15px 0;
}
.editor-wrapper,
.form-wrapper {
  max-width: 700px;
}

input,
button {
  margin: 10px 0;
  font-size: 15px;
}

input[type="text"] {
  width: 100%;
  padding: 10px 0;
}

button {
  min-width: 120px;
}
</style>
