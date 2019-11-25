import Vue from 'vue';
import 'trix';
import 'trix/dist/trix.css';
import __vue_normalize__ from 'C:UserslacambratDevelopmentue-trix
ode_modulesollup-plugin-vueuntime
ormalize.js';
import __vue_create_injector__ from 'C:UserslacambratDevelopmentue-trix
ode_modulesollup-plugin-vueuntimerowser.js';

/**
 *
 * @param {*} component
 */
function EmitFileAccept (component) {
  return {
    methods: {
      emitFileAccept: function emitFileAccept (file) {
        this.$emit('trix-file-accept', file);
      }
    }
  }
}

/**
 *
 * @param {*} component
 */
function EmitInitialize (component) {
  return {
    methods: {
      emitInitialize: function emitInitialize (editor) {
        this.$emit('trix-initialize', this.$refs.trix.editor, event);
      }
    }
  }
}

/**
 *
 * @param {*} component
 */
function EmitAttachmentAdd (component) {
  return {
    methods: {
      emitAttachmentAdd: function emitAttachmentAdd (file) {
        this.$emit('trix-attachment-add', file);
      }
    }
  }
}

/**
 *
 * @param {*} component
 */
function EmitSelectionChange (component) {
  return {
    methods: {
      emitSelectionChange: function emitSelectionChange (event) {
        this.$emit('trix-selection-change', this.$refs.trix.editor, event);
      }
    }
  }
}

/**
 *
 * @param {*} component
 */
function EmitAttachmentRemove (component) {
  return {
    methods: {
      emitAttachmentRemove: function emitAttachmentRemove (file) {
        this.$emit('trix-attachment-remove', file);
      }
    }
  }
}

/**
 *
 * @param {*} component
 */
function EmitBeforeInitialize (component) {
  return {
    methods: {
      emitBeforeInitialize: function emitBeforeInitialize (event) {
        this.$emit('trix-before-initialize', this.$refs.trix.editor, event);
      }
    }
  }
}

function ProcessEditorFocusAndBlur (component) {
  return {
    methods: {
      processTrixFocus: function processTrixFocus (event) {
        if (this.$refs.trix) {
          this.isActived = true;
          this.$emit('trix-focus', this.$refs.trix.editor, event);
        }
      },
      processTrixBlur: function processTrixBlur (event) {
        if (this.$refs.trix) {
          this.isActived = false;
          this.$emit('trix-blur', this.$refs.trix.editor, event);
        }
      }
    }
  }
}

//

var script = {
  name: 'VueTrix',
  mixins: [
    EmitFileAccept(),
    EmitInitialize(),
    EmitAttachmentAdd(),
    EmitSelectionChange(),
    EmitAttachmentRemove(),
    EmitBeforeInitialize(),
    ProcessEditorFocusAndBlur()
  ],
  model: {
    prop: 'srcContent',
    event: 'update'
  },
  props: {
    /**
     * This prop will put the editor in read-only mode
     */
    disabledEditor: {
      type: Boolean,
      required: false,
      default: function default$1 () {
        return false
      }
    },
    /**
     * This is referenced `id` of the hidden input field defined.
     * It is optional and will be a random string by default.
     */
    inputId: {
      type: String,
      required: false,
      default: function default$2 () {
        return ''
      }
    },
    /**
     * This is referenced `name` of the hidden input field defined,
     * default value is `content`.
     */
    inputName: {
      type: String,
      required: false,
      default: function default$3 () {
        return 'content'
      }
    },
    /**
     * The placeholder attribute specifies a short hint
     * that describes the expected value of a editor.
     */
    placeholder: {
      type: String,
      required: false,
      default: function default$4 () {
        return ''
      }
    },
    /**
     * The source content is associcated to v-model directive.
     */
    srcContent: {
      type: String,
      required: false,
      default: function default$5 () {
        return ''
      }
    },
    /**
     * The boolean attribute allows saving editor state into browser's localStorage
     * (optional, default is `false`).
     */
    localStorage: {
      type: Boolean,
      required: false,
      default: function default$6 () {
        return false
      }
    }
  },
  created: function created () {
    /**
     *  If localStorage is enabled,
     *  then load editor's content from the beginning.
     */
    if (this.localStorage) {
      var savedValue = localStorage.getItem(this.storageId('VueTrix'));
      if (savedValue && !this.srcContent) {
        this.$refs.trix.editor.loadJSON(JSON.parse(savedValue));
      }
    }
  },
  mounted: function mounted () {
    /** Check if editor read-only mode is required */
    this.decorateDisabledEditor();
  },
  data: function data () {
    return {
      editorContent: this.srcContent,
      isActived: null
    }
  },
  methods: {
    handleContentChange: function handleContentChange (event) {
      this.editorContent = event.srcElement ? event.srcElement.value : event.target.value;
      this.$emit('input', this.editorContent);
    },
    handleInitialContentChange: function handleInitialContentChange (newContent, oldContent) {
      newContent = newContent === undefined ? '' : newContent;

      if (this.$refs.trix.editor.innerHTML !== newContent) {
        /* Update editor's content when initial content changed */
        this.editorContent = newContent;

        /**
         *  If user are typing, then don't reload the editor,
         *  hence keep cursor's position after typing.
         */
        if (!this.isActived) {
          this.reloadEditorContent(this.editorContent);
        }
      }
    },
    emitEditorState: function emitEditorState (value) {
      /**
       * If localStorage is enabled,
       * then save editor's content into storage
       */
      if (this.localStorage) {
        localStorage.setItem(
          this.storageId('VueTrix'),
          JSON.stringify(this.$refs.trix.editor)
        );
      }
      this.$emit('update', this.editorContent);
    },
    storageId: function storageId (component) {
      if (this.inputId) {
        return (component + "." + (this.inputId) + ".content")
      } else {
        return (component + ".content")
      }
    },
    reloadEditorContent: function reloadEditorContent (newContent) {
      // Reload HTML content
      this.$refs.trix.editor.loadHTML(newContent);

      // Move cursor to end of new content updated
      this.$refs.trix.editor.setSelectedRange(this.getContentEndPosition());
    },
    getContentEndPosition: function getContentEndPosition () {
      return this.$refs.trix.editor.getDocument().toString().length - 1
    },
    decorateDisabledEditor: function decorateDisabledEditor () {
      /** Disable toolbar and editor by pointer events styling */
      if (this.disabledEditor) {
        this.$refs.trix.toolbarElement.style['pointer-events'] = 'none';
        this.$refs.trix.style['pointer-events'] = 'none';
        this.$refs.trix.style['background'] = '#e9ecef';
      }
    }
  },
  computed: {
    /**
     * Compute a random id of hidden input
     * when it haven't been specified.
     */
    generateId: function generateId () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16)
      })
    },
    computedId: function computedId () {
      return this.inputId || this.generateId
    },
    initialContent: function initialContent () {
      return this.srcContent
    }
  },
  watch: {
    editorContent: {
      handler: 'emitEditorState'
    },
    initialContent: {
      handler: 'handleInitialContentChange'
    }
  }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: [_vm.$style.trix_container] },
    [
      _c("trix-editor", {
        ref: "trix",
        class: ["trix-content"],
        attrs: {
          contenteditable: !_vm.disabledEditor,
          input: _vm.computedId,
          placeholder: _vm.placeholder
        },
        on: {
          "trix-change": _vm.handleContentChange,
          "trix-file-accept": _vm.emitFileAccept,
          "trix-attachment-add": _vm.emitAttachmentAdd,
          "trix-attachment-remove": _vm.emitAttachmentRemove,
          "trix-selection-change": _vm.emitSelectionChange,
          "trix-initialize": _vm.emitInitialize,
          "trix-before-initialize": _vm.emitBeforeInitialize,
          "trix-focus": _vm.processTrixFocus,
          "trix-blur": _vm.processTrixBlur
        }
      }),
      _vm._v(" "),
      _c("input", {
        attrs: { type: "hidden", name: _vm.inputName, id: _vm.computedId },
        domProps: { value: _vm.editorContent }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-1d431644_0", { source: "\n.src-components-trix_container-2DRb {\r\n  max-width: 100%;\r\n  height: auto;\n}\n.src-components-trix_container-2DRb .src-components-trix-button-group-2Me9 {\r\n  background-color: white;\n}\n.src-components-trix_container-2DRb .src-components-trix-content-3q6f {\r\n  background-color: white;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\lacambrat\\Development\\vue-trix\\src\\components\\VueTrix.vue"],"names":[],"mappings":";AAwOA;EACA,eAAA;EACA,YAAA;AACA;AACA;EACA,uBAAA;AACA;AACA;EACA,uBAAA;AACA","file":"VueTrix.vue","sourcesContent":["<template>\r\n  <div :class=\"[$style.trix_container]\">\r\n    <trix-editor\r\n      :contenteditable=\"!disabledEditor\"\r\n      :class=\"['trix-content']\"\r\n      ref=\"trix\"\r\n      :input=\"computedId\"\r\n      :placeholder=\"placeholder\"\r\n      @trix-change=\"handleContentChange\"\r\n      @trix-file-accept=\"emitFileAccept\"\r\n      @trix-attachment-add=\"emitAttachmentAdd\"\r\n      @trix-attachment-remove=\"emitAttachmentRemove\"\r\n      @trix-selection-change=\"emitSelectionChange\"\r\n      @trix-initialize=\"emitInitialize\"\r\n      @trix-before-initialize=\"emitBeforeInitialize\"\r\n      @trix-focus=\"processTrixFocus\"\r\n      @trix-blur=\"processTrixBlur\"\r\n    />\r\n    <input\r\n      type=\"hidden\"\r\n      :name=\"inputName\"\r\n      :id=\"computedId\"\r\n      :value=\"editorContent\"\r\n    />\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport 'trix'\r\nimport 'trix/dist/trix.css'\r\nimport EmitFileAccept from '../mixins/EmitFileAccept.js'\r\nimport EmitInitialize from '../mixins/EmitInitialize.js'\r\nimport EmitAttachmentAdd from '../mixins/EmitAttachmentAdd.js'\r\nimport EmitSelectionChange from '../mixins/EmitSelectionChange.js'\r\nimport EmitAttachmentRemove from '../mixins/EmitAttachmentRemove.js'\r\nimport EmitBeforeInitialize from '../mixins/EmitBeforeInitialize.js'\r\nimport ProcessEditorFocusAndBlur from '../mixins/ProcessEditorFocusAndBlur.js'\r\n\r\nexport default {\r\n  name: 'VueTrix',\r\n  mixins: [\r\n    EmitFileAccept(),\r\n    EmitInitialize(),\r\n    EmitAttachmentAdd(),\r\n    EmitSelectionChange(),\r\n    EmitAttachmentRemove(),\r\n    EmitBeforeInitialize(),\r\n    ProcessEditorFocusAndBlur()\r\n  ],\r\n  model: {\r\n    prop: 'srcContent',\r\n    event: 'update'\r\n  },\r\n  props: {\r\n    /**\r\n     * This prop will put the editor in read-only mode\r\n     */\r\n    disabledEditor: {\r\n      type: Boolean,\r\n      required: false,\r\n      default () {\r\n        return false\r\n      }\r\n    },\r\n    /**\r\n     * This is referenced `id` of the hidden input field defined.\r\n     * It is optional and will be a random string by default.\r\n     */\r\n    inputId: {\r\n      type: String,\r\n      required: false,\r\n      default () {\r\n        return ''\r\n      }\r\n    },\r\n    /**\r\n     * This is referenced `name` of the hidden input field defined,\r\n     * default value is `content`.\r\n     */\r\n    inputName: {\r\n      type: String,\r\n      required: false,\r\n      default () {\r\n        return 'content'\r\n      }\r\n    },\r\n    /**\r\n     * The placeholder attribute specifies a short hint\r\n     * that describes the expected value of a editor.\r\n     */\r\n    placeholder: {\r\n      type: String,\r\n      required: false,\r\n      default () {\r\n        return ''\r\n      }\r\n    },\r\n    /**\r\n     * The source content is associcated to v-model directive.\r\n     */\r\n    srcContent: {\r\n      type: String,\r\n      required: false,\r\n      default () {\r\n        return ''\r\n      }\r\n    },\r\n    /**\r\n     * The boolean attribute allows saving editor state into browser's localStorage\r\n     * (optional, default is `false`).\r\n     */\r\n    localStorage: {\r\n      type: Boolean,\r\n      required: false,\r\n      default () {\r\n        return false\r\n      }\r\n    }\r\n  },\r\n  created () {\r\n    /**\r\n     *  If localStorage is enabled,\r\n     *  then load editor's content from the beginning.\r\n     */\r\n    if (this.localStorage) {\r\n      const savedValue = localStorage.getItem(this.storageId('VueTrix'))\r\n      if (savedValue && !this.srcContent) {\r\n        this.$refs.trix.editor.loadJSON(JSON.parse(savedValue))\r\n      }\r\n    }\r\n  },\r\n  mounted () {\r\n    /** Check if editor read-only mode is required */\r\n    this.decorateDisabledEditor()\r\n  },\r\n  data () {\r\n    return {\r\n      editorContent: this.srcContent,\r\n      isActived: null\r\n    }\r\n  },\r\n  methods: {\r\n    handleContentChange (event) {\r\n      this.editorContent = event.srcElement ? event.srcElement.value : event.target.value\r\n      this.$emit('input', this.editorContent)\r\n    },\r\n    handleInitialContentChange (newContent, oldContent) {\r\n      newContent = newContent === undefined ? '' : newContent\r\n\r\n      if (this.$refs.trix.editor.innerHTML !== newContent) {\r\n        /* Update editor's content when initial content changed */\r\n        this.editorContent = newContent\r\n\r\n        /**\r\n         *  If user are typing, then don't reload the editor,\r\n         *  hence keep cursor's position after typing.\r\n         */\r\n        if (!this.isActived) {\r\n          this.reloadEditorContent(this.editorContent)\r\n        }\r\n      }\r\n    },\r\n    emitEditorState (value) {\r\n      /**\r\n       * If localStorage is enabled,\r\n       * then save editor's content into storage\r\n       */\r\n      if (this.localStorage) {\r\n        localStorage.setItem(\r\n          this.storageId('VueTrix'),\r\n          JSON.stringify(this.$refs.trix.editor)\r\n        )\r\n      }\r\n      this.$emit('update', this.editorContent)\r\n    },\r\n    storageId (component) {\r\n      if (this.inputId) {\r\n        return `${component}.${this.inputId}.content`\r\n      } else {\r\n        return `${component}.content`\r\n      }\r\n    },\r\n    reloadEditorContent (newContent) {\r\n      // Reload HTML content\r\n      this.$refs.trix.editor.loadHTML(newContent)\r\n\r\n      // Move cursor to end of new content updated\r\n      this.$refs.trix.editor.setSelectedRange(this.getContentEndPosition())\r\n    },\r\n    getContentEndPosition () {\r\n      return this.$refs.trix.editor.getDocument().toString().length - 1\r\n    },\r\n    decorateDisabledEditor () {\r\n      /** Disable toolbar and editor by pointer events styling */\r\n      if (this.disabledEditor) {\r\n        this.$refs.trix.toolbarElement.style['pointer-events'] = 'none'\r\n        this.$refs.trix.style['pointer-events'] = 'none'\r\n        this.$refs.trix.style['background'] = '#e9ecef'\r\n      }\r\n    }\r\n  },\r\n  computed: {\r\n    /**\r\n     * Compute a random id of hidden input\r\n     * when it haven't been specified.\r\n     */\r\n    generateId () {\r\n      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {\r\n        var r = Math.random() * 16 | 0\r\n        var v = c === 'x' ? r : (r & 0x3 | 0x8)\r\n        return v.toString(16)\r\n      })\r\n    },\r\n    computedId () {\r\n      return this.inputId || this.generateId\r\n    },\r\n    initialContent () {\r\n      return this.srcContent\r\n    }\r\n  },\r\n  watch: {\r\n    editorContent: {\r\n      handler: 'emitEditorState'\r\n    },\r\n    initialContent: {\r\n      handler: 'handleInitialContentChange'\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"css\" module>\r\n.trix_container {\r\n  max-width: 100%;\r\n  height: auto;\r\n}\r\n.trix_container .trix-button-group {\r\n  background-color: white;\r\n}\r\n.trix_container .trix-content {\r\n  background-color: white;\r\n}\r\n</style>\r\n"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"trix_container":"src-components-trix_container-2DRb","trix-button-group":"src-components-trix-button-group-2Me9","trix-content":"src-components-trix-content-3q6f"} });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var VueTrix = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

/*
 * Vue-Trix index.js
 * Author: tranduchanh.ms@gmail.com
 * Github: https://github.com/hanhdt/vue-trix
 */
Vue.config.ignoredElements = ['trix-editor'];

Vue.component(VueTrix.name, VueTrix);

export default VueTrix;
//# sourceMappingURL=vue-trix.esm.js.map
