<template>
  <div class="container">
    <div class="editor-wrapper">
      <h2>1. A simple text editor</h2>
      <VueTrix
        localStorage
        autofocus
        v-model="content1"
        placeholder="Enter your content"
        @trix-file-accept="handleFile"
        @trix-attachment-add="handleAttachmentAdd"
        @trix-attachment-remove="handleAttachmentRemove"
        @trix-focus="handleEditorFocus"
        @trix-blur="handleEditorBlur"
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
    <hr>
    <div class="editor-wrapper">
      <h2>3. Text editor disabled</h2>
      <VueTrix
        localStorage
        v-model="content3"
        placeholder="Enter your content"
        :disabled-editor="disableEditor"
        @trix-file-accept="handleFile"
        @trix-attachment-add="handleAttachmentAdd"
        @trix-attachment-remove="handleAttachmentRemove"
        @trix-focus="handleEditorFocus"
        @trix-blur="handleEditorBlur"
      />
    </div>
    <hr>
    <div class="editor-wrapper">
      <h2>4. Override default configuration</h2>
      <VueTrix
        localStorage
        v-model="content4"
        placeholder="Enter your content"
        :config="editor4Config"
        @trix-file-accept="handleFile"
        @trix-attachment-add="handleAttachmentAdd"
        @trix-attachment-remove="handleAttachmentRemove"
        @trix-focus="handleEditorFocus"
        @trix-blur="handleEditorBlur"
      />
    </div>
  </div>
</template>

<script>
import VueTrix from '../../../src/components/VueTrix.vue'

export default {
  name: 'Editor',
  components: {
    VueTrix
  },
  props: {
    inputName: {
      type: String,
      required: false,
      default: 'content'
    }
  },
  data () {
    return {
      content1: '<h1>here is heading</h1>',
      content2: '<blockquote>description content</blockquote>',
      content3: '<h1>Hello world!</h1>',
      content4: '<h1>Disabled attachments captions</h1>',
      disableEditor: true,
      editor4Config: {
        attachments: {
          preview: {
            caption: {
              name: false,
              size: false
            }
          }
        }
      }
    }
  },
  methods: {
    handleFile (file) {
      console.log('Drop file:', file)
    },
    handleAttachmentAdd (file) {
      console.log('Upload file:', file)
    },
    handleAttachmentRemove (file) {
      console.log('Remove file:', file)
    },
    handleEditorFocus (event) {
      console.log('Editor is focused:', event)
    },
    handleEditorBlur (event) {
      console.log('Editor is lost focus', event)
    }
  },
  watch: {
    content3 (value) {
      value = value === undefined ? '' : value
      if (this.$refs.trix.innerHTML !== value) {
        this.$refs.trix.editor.loadHTML(value)
      }
    }
  }
}
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
