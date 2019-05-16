# Vue-Trix Text Editor [![npm](https://img.shields.io/npm/v/vue-trix.svg?style=flat)](https://www.npmjs.com/package/vue-trix) [![Build status](https://ci.appveyor.com/api/projects/status/nffmo893v52evpgm/branch/master?svg=true)](https://ci.appveyor.com/project/tranduchanh/vue-trix/branch/master) <img alt="npm" src="https://img.shields.io/npm/dm/vue-trix.svg">

Simple and lightweight [Trix](https://www.npmjs.com/package/trix) rich-text editor Vue.js component for writing daily

## [Sample page](/example)

![trix vue](/example/src/assets/vue-trix-simple.png)

![trix vue with form](/example/src/assets/vue-trix-form.png)

## Features

- A simple and lightweight rich-text editor
- Binding with your `v-model` easily
- Auto-save editor data temporally what you has typed into the form input in case something goes wrong (for example, the browser could crash or you could accidentally refresh the page without submit saving)

## Installation

NPM

```Shell
  $npm install --save vue-trix
```

YARN

```Shell
  $yarn add vue-trix
```

## Mount

### Mount with global

in the `main.js`, import the package as a global component.

```javascript
import "vue-trix";
```

### Mount with component

```javascript
import VueTrix from "vue-trix";

export default {
  // ...
  components: {
    VueTrix
  }
};
```

## Component Usages

### Create a simple editor in your single component file

Add `VueTrix` component into `*.vue` template

```XML
  <template>
    <!-- ... -->
    <VueTrix v-model="editorContent" placeholder="Enter content" localStorage/>
    <!-- ... -->
  </template>
```

### Integrating with Forms

```XML
  <form ...>
    <VueTrix inputId="editor1" v-model="editorContent" placeholder="enter your content..."/>
  </form>
```

### Props descriptions

- `inputId`: This is referenced `id` of the hidden input field defined, it is optional.
- `inputName`: This is referenced `name` of the hidden input field defined, default value is `content`.
- `placeholder`: The placeholder option attribute specifies a short hint that describes the expected value of a editor.
- `localStorage`: The boolean attribute allows saving editor state into browser's localStorage (optional, default is `false`).
- `trixFocus`: The function to call when editor is focused (optional).
- `trixBlur`: The function to call when editor goes out of focus (optional).

### Populating editor content

#### Init loading content into the editor

In case, you want to load initial data from database then display into the editor. you can use `v-model` directive with local component's state.

```javascript
// Declare local component's state is loaded from database
export default {
  // ...
  data() {
    return {
      editorContent: "<h1>Editor contents</h1>"
    };
  }
  // ...
};
```

```HTML
  // Assign to v-model directive
  <template>
    <!-- ... -->
    <VueTrix v-model="editorContent"/>
    <!-- ... -->
  </template>
```

#### Track data changes

The local component's state will be changed reactively when you modified contents inside the trix editor UI. Therefore, you need to `watch` the local state for updating content back to database

```javascript
export default {
  // ...
  methods: {
    updateEditorContent(value) {
      // Update new content into the database via state mutations.
    }
  },
  watch: {
    editorContent: {
      handler: "updateEditorContent"
    }
  }
  // ...
};
```

### Binding attachment changes

The `<VueTrix/>` element emits several events which you can use to observe and respond to changes in editor state.

- `@trix-file-accept` fires before an attachment is added to the document. If you don’t want to accept dropped or pasted files, call preventDefault() on this event.

- `@trix-attachment-add` fires after an attachment is added to the document. You can access the Trix attachment object through the attachment property on the event. If the attachment object has a file property, you should store this file remotely and set the attachment’s URL attribute.

- `@trix-attachment-remove` fires when an attachment is removed from the document. You can access the Trix attachment object through the attachment property on the event. You may wish to use this event to clean up remotely stored files.

## Trix document

[Full documentation](https://github.com/basecamp/trix#readme)

## Contributing

If you're interested in contributing to Vue-Trix or share your opinions, please consider to submitting a [**pull request**](https://github.com/hanhdt/vue-trix/pulls) or post [**issues**](https://github.com/hanhdt/vue-trix/issues). Also, I will try to code-self documentation.
