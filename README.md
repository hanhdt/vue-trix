# Vue-Trix Text Editor

[![npm](https://img.shields.io/npm/v/vue-trix.svg?style=flat)](https://www.npmjs.com/package/vue-trix) [![Build status](https://ci.appveyor.com/api/projects/status/nffmo893v52evpgm/branch/master?svg=true)](https://ci.appveyor.com/project/tranduchanh/vue-trix/branch/master) <img alt="npm" src="https://img.shields.io/npm/dm/vue-trix.svg">

Simple and lightweight [Trix](https://www.npmjs.com/package/trix) rich-text editor Vue.js component for writing daily

## Table of Contents

- [Vue-Trix Text Editor](#vue-trix-text-editor)
  - [Table of Contents](#table-of-contents)
  - [Getting started](#getting-started)
    - [Demo page](#demo-page)
    - [Integrate into the form](#integrate-into-the-form)
  - [Features](#features)
  - [Installation](#installation)
    - [NPM](#npm)
    - [YARN](#yarn)
    - [Or directly from latest Github repo](#or-directly-from-latest-github-repo)
  - [Mount](#mount)
    - [Mount with global](#mount-with-global)
    - [Mount with component](#mount-with-component)
    - [Setup with Nuxt.js (SSR)](#setup-with-nuxtjs-ssr)
  - [Component Usages](#component-usages)
    - [Create a simple editor in your single component file](#create-a-simple-editor-in-your-single-component-file)
    - [Integrating with Forms](#integrating-with-forms)
    - [Props descriptions](#props-descriptions)
    - [Populating editor content](#populating-editor-content)
      - [Init loading content into the editor](#init-loading-content-into-the-editor)
      - [Track data changes](#track-data-changes)
    - [Binding attachment events](#binding-attachment-events)
    - [Process uploading attachment to remote server](#process-uploading-attachment-to-remote-server)
  - [Trix document](#trix-document)
  - [Contributing](#contributing)

## Getting started

### [Demo page](/example)

![vue-trix editor](/example/src/assets/vue-trix-editor.png)

### Integrate into the form

![vue-trix in production](/example/src/assets/vue-trix-in-prod.png)

## Features

- A simple and lightweight rich-text editor for writing daily.
- Two-ways binding with `v-model` easily.
- Auto-save editor data temporally what you has typed into the form input in case something goes wrong (for example, the browser could crash or you could accidentally refresh the page without submit saving).

## Installation

### NPM

```Shell
  $npm install --save vue-trix
```

### YARN

```Shell
  $yarn add vue-trix
```

### Or directly from latest Github repo

```Shell
  $npm install --save hanhdt/vue-trix
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

### Setup with Nuxt.js (SSR)

Create mounting plugin file

```javascript
// plugins/vue_trix.js
import Vue from "vue";
import VueTrix from "vue-trix";

Vue.use(VueTrix);
```

Update Nuxt.js config file

```javascript
// nuxt.config.js
plugins: [{ src: "~/plugins/vue_trix", mode: "client" }];
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
- `autofocus`: Automatically focus the editor when it loads
- `disabledEditor`: This prop will put the editor in read-only mode.
- `localStorage`: The boolean attribute allows saving editor state into browser's localStorage (optional, default is `false`).

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

### Binding attachment events

The `<VueTrix/>` element emits several events which you can use to observe and respond to changes in editor state.

- `@trix-file-accept` fires before an attachment is added to the document. If you don’t want to accept dropped or pasted files, call preventDefault() on this event.

- `@trix-attachment-add` fires after an attachment is added to the document. You can access the Trix attachment object through the attachment property on the event. If the attachment object has a file property, you should store this file remotely and set the attachment’s URL attribute.

- `@trix-attachment-remove` fires when an attachment is removed from the document. You can access the Trix attachment object through the attachment property on the event. You may wish to use this event to clean up remotely stored files.

### Process uploading attachment to remote server

Add binding event listener to `trix-attachment-add`

```HTML
  <template>
    <!-- ... -->
    <VueTrix @trix-attachment-add="handleAttachmentChanges"/>
    <!-- ... -->
  </template>
```

In Javascript

```Javascript
  const remoteHost = 'your remote host';

  function handleAttachmentChanges(event) {
    // 1. get file object
    let file = event.attachment.file;

    // 2. upload file to remote server with FormData
    // ...

    // 3. if upload success, set back the attachment's URL attribute
    // @param object data from remote server response data after upload.
    let attributes = {
      url: remoteHost + data.path,
      href: remoteHost + data.path
    };
    event.attachment.setAttributes(attributes);
  }
```

## Trix document

[Full documentation](https://github.com/basecamp/trix#readme)

## Contributing

If you're interested in contributing to Vue-Trix or share your opinions, please consider to submitting a [**pull request**](https://github.com/hanhdt/vue-trix/pulls) or post [**issues**](https://github.com/hanhdt/vue-trix/issues). Also, I will try to code-self documentation.
