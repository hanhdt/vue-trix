# Vue-Trix Text Editor

[![npm](https://img.shields.io/npm/v/vue-trix.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-trix)

Simple and lightweight [Trix](https://www.npmjs.com/package/trix) rich-text editor component for Vue.js

## [Sample page](/example)

![trix vue](/example/src/assets/vue-trix-simple.png)

![trix vue with form](/example/src/assets/vue-trix-form.png)

## Installation

NPM

```Shell
  $npm install --save vue-trix
```

YARN

```Shell
  $yarn add vue-trix
```

## Features

- A simple and lightweight rich-text editor
- Binding with your `v-model` easily
- Auto-save editor data temporally what you has typed into the form input in case something goes wrong (for example, the browser could crash or you could accidentally refresh the page without submit saving)

## Mount

### Mount with global

in the `main.js`, import the package as a global component.

```javascript
  import 'vue-trix'
```

### Mount with component

```javascript
  import VueTrix from 'vue-trix'

  export default {
    // ...
    components: {
      VueTrix
    }
  }
```

## Component Usages

### Create a simple editor

Add `VueTrix` component into `*.vue` template

```XML
  <template>
    <!-- ... -->
    <VueTrix v-model="editorContent"/>
    <!-- ... -->
  </template>
```

### Integrating with Forms

```XML
  <form ...>
    <VueTrix inputId="editor1" v-model="editorContent"/>
  </form>
```

#### Props descriptions

- `inputId`: This is referenced `id` of the hidden input field defined

### Binding editor changes

The `<VueTrix/>` element emits several events which you can use to observe and respond to changes in editor state.

- `@trix-attachment-add` fires after an attachment is added to the document. You can access the Trix attachment object through the attachment property on the event. If the attachment object has a file property, you should store this file remotely and set the attachment’s URL attribute.

- `@trix-attachment-remove` fires when an attachment is removed from the document. You can access the Trix attachment object through the attachment property on the event. You may wish to use this event to clean up remotely stored files.

## Trix document

[Full documentation](https://github.com/basecamp/trix#readme)

## Contributing

If you're interested in contributing to Vue-Trix, please consider to submitting a [**pull request**](https://github.com/hanhdt/vue-trix/pulls) or post [**issues**](https://github.com/hanhdt/vue-trix/issues).
