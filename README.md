# Vue-Trix Editor

[Trix](https://www.npmjs.com/package/trix) text editor component for Vue.js

## Example

[Demo page](/example)

![trix vue](/example/assets/vue-trix-editor.png)

## Installation

NPM

```Shell
  $npm install --save vue-trix
```

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

```html
  <template>
    <!-- ... -->
    <VueTrix/>
    <!-- ... -->
  </template>
```

### Integrating with Forms

```html
  <form ...>
    <input id="x" type="hidden" name="content">
    <VueTrix inputId="x"/>
  </form>
```

#### Props descriptions

- `inputId`: This is referenced `id` of the hidden input field defined

## Trix documents

[Full documentation](https://github.com/basecamp/trix#readme)