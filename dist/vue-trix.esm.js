import Vue from 'vue';
import Trix from 'trix';
import 'trix/dist/trix.css';

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
  name: 'vue-trix',
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
    },
    /**
     * Focuses cursor in the editor when attached to the DOM
     * (optional, default is `false`).
     */
    autofocus: {
      type: Boolean,
      required: false,
      default: function default$7 () {
        return false
      }
    },
    /**
     * Object to override default editor configuration
     */
    config: {
      type: Object,
      required: false,
      default: function default$8 () {
        return {}
      }
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    /** Override editor configuration */
    this.overrideConfig(this.config);
    /** Check if editor read-only mode is required */
    this.decorateDisabledEditor(this.disabledEditor);
    this.$nextTick(function () {
      /**
       *  If localStorage is enabled,
       *  then load editor's content from the beginning.
       */
      if (this$1.localStorage) {
        var savedValue = localStorage.getItem(this$1.storageId('VueTrix'));
        if (savedValue && !this$1.srcContent) {
          this$1.$refs.trix.editor.loadJSON(JSON.parse(savedValue));
        }
      }
    });
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
    handleInitialize: function handleInitialize (event) {
      /**
       * If autofocus is true, manually set focus to
       * beginning of content (consistent with Trix behavior)
       */
      if (this.autofocus) {
        this.$refs.trix.editor.setSelectedRange(0);
      }

      this.$emit('trix-initialize', this.emitInitialize);
    },
    handleInitialContentChange: function handleInitialContentChange (newContent, oldContent) {
      newContent = newContent === undefined ? '' : newContent;

      if (this.$refs.trix.editor && this.$refs.trix.editor.innerHTML !== newContent) {
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
    decorateDisabledEditor: function decorateDisabledEditor (editorState) {
      /** Disable toolbar and editor by pointer events styling */
      if (editorState) {
        this.$refs.trix.toolbarElement.style['pointer-events'] = 'none';
        this.$refs.trix.contentEditable = false;
        this.$refs.trix.style['background'] = '#e9ecef';
      } else {
        this.$refs.trix.toolbarElement.style['pointer-events'] = 'unset';
        this.$refs.trix.style['pointer-events'] = 'unset';
        this.$refs.trix.style['background'] = 'transparent';
      }
    },
    overrideConfig: function overrideConfig (config) {
      Trix.config = this.deepMerge(Trix.config, config);
    },
    deepMerge: function deepMerge (target, override) {
      // deep merge the object into the target object
      for (var prop in override) {
        if (override.hasOwnProperty(prop)) {
          if (Object.prototype.toString.call(override[prop]) === '[object Object]') {
            // if the property is a nested object
            target[prop] = this.deepMerge(target[prop], override[prop]);
          } else {
            // for regular property
            target[prop] = override[prop];
          }
        }
      }

      return target
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
    },
    isDisabled: function isDisabled () {
      return this.disabledEditor
    }
  },
  watch: {
    editorContent: {
      handler: 'emitEditorState'
    },
    initialContent: {
      handler: 'handleInitialContentChange'
    },
    isDisabled: {
      handler: 'decorateDisabledEditor'
    },
    config: {
      handler: 'overrideConfig',
      deep: true
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

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
          "trix-initialize": _vm.handleInitialize,
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
    inject("data-v-501b9774_0", { source: "\n.src-components-trix_container-5Bcy {\n  max-width: 100%;\n  height: auto;\n}\n.src-components-trix_container-5Bcy .src-components-trix-button-group-2D-J {\n  background-color: white;\n}\n.src-components-trix_container-5Bcy .src-components-trix-content-1TD_ {\n  background-color: white;\n}\n", map: {"version":3,"sources":["/home/hanh/side-projects/vue-trix/src/components/VueTrix.vue"],"names":[],"mappings":";AA2SA;EACA,eAAA;EACA,YAAA;AACA;AACA;EACA,uBAAA;AACA;AACA;EACA,uBAAA;AACA","file":"VueTrix.vue","sourcesContent":["<template>\n  <div :class=\"[$style.trix_container]\">\n    <trix-editor\n      :contenteditable=\"!disabledEditor\"\n      :class=\"['trix-content']\"\n      ref=\"trix\"\n      :input=\"computedId\"\n      :placeholder=\"placeholder\"\n      @trix-change=\"handleContentChange\"\n      @trix-file-accept=\"emitFileAccept\"\n      @trix-attachment-add=\"emitAttachmentAdd\"\n      @trix-attachment-remove=\"emitAttachmentRemove\"\n      @trix-selection-change=\"emitSelectionChange\"\n      @trix-initialize=\"handleInitialize\"\n      @trix-before-initialize=\"emitBeforeInitialize\"\n      @trix-focus=\"processTrixFocus\"\n      @trix-blur=\"processTrixBlur\"\n    />\n    <input\n      type=\"hidden\"\n      :name=\"inputName\"\n      :id=\"computedId\"\n      :value=\"editorContent\"\n    />\n  </div>\n</template>\n\n<script>\nimport Trix from 'trix'\nimport 'trix/dist/trix.css'\nimport EmitFileAccept from '../mixins/EmitFileAccept.js'\nimport EmitInitialize from '../mixins/EmitInitialize.js'\nimport EmitAttachmentAdd from '../mixins/EmitAttachmentAdd.js'\nimport EmitSelectionChange from '../mixins/EmitSelectionChange.js'\nimport EmitAttachmentRemove from '../mixins/EmitAttachmentRemove.js'\nimport EmitBeforeInitialize from '../mixins/EmitBeforeInitialize.js'\nimport ProcessEditorFocusAndBlur from '../mixins/ProcessEditorFocusAndBlur.js'\n\nexport default {\n  name: 'vue-trix',\n  mixins: [\n    EmitFileAccept(),\n    EmitInitialize(),\n    EmitAttachmentAdd(),\n    EmitSelectionChange(),\n    EmitAttachmentRemove(),\n    EmitBeforeInitialize(),\n    ProcessEditorFocusAndBlur()\n  ],\n  model: {\n    prop: 'srcContent',\n    event: 'update'\n  },\n  props: {\n    /**\n     * This prop will put the editor in read-only mode\n     */\n    disabledEditor: {\n      type: Boolean,\n      required: false,\n      default () {\n        return false\n      }\n    },\n    /**\n     * This is referenced `id` of the hidden input field defined.\n     * It is optional and will be a random string by default.\n     */\n    inputId: {\n      type: String,\n      required: false,\n      default () {\n        return ''\n      }\n    },\n    /**\n     * This is referenced `name` of the hidden input field defined,\n     * default value is `content`.\n     */\n    inputName: {\n      type: String,\n      required: false,\n      default () {\n        return 'content'\n      }\n    },\n    /**\n     * The placeholder attribute specifies a short hint\n     * that describes the expected value of a editor.\n     */\n    placeholder: {\n      type: String,\n      required: false,\n      default () {\n        return ''\n      }\n    },\n    /**\n     * The source content is associcated to v-model directive.\n     */\n    srcContent: {\n      type: String,\n      required: false,\n      default () {\n        return ''\n      }\n    },\n    /**\n     * The boolean attribute allows saving editor state into browser's localStorage\n     * (optional, default is `false`).\n     */\n    localStorage: {\n      type: Boolean,\n      required: false,\n      default () {\n        return false\n      }\n    },\n    /**\n     * Focuses cursor in the editor when attached to the DOM\n     * (optional, default is `false`).\n     */\n    autofocus: {\n      type: Boolean,\n      required: false,\n      default () {\n        return false\n      }\n    },\n    /**\n     * Object to override default editor configuration\n     */\n    config: {\n      type: Object,\n      required: false,\n      default () {\n        return {}\n      }\n    }\n  },\n  mounted () {\n    /** Override editor configuration */\n    this.overrideConfig(this.config)\n    /** Check if editor read-only mode is required */\n    this.decorateDisabledEditor(this.disabledEditor)\n    this.$nextTick(() => {\n      /**\n       *  If localStorage is enabled,\n       *  then load editor's content from the beginning.\n       */\n      if (this.localStorage) {\n        const savedValue = localStorage.getItem(this.storageId('VueTrix'))\n        if (savedValue && !this.srcContent) {\n          this.$refs.trix.editor.loadJSON(JSON.parse(savedValue))\n        }\n      }\n    })\n  },\n  data () {\n    return {\n      editorContent: this.srcContent,\n      isActived: null\n    }\n  },\n  methods: {\n    handleContentChange (event) {\n      this.editorContent = event.srcElement ? event.srcElement.value : event.target.value\n      this.$emit('input', this.editorContent)\n    },\n    handleInitialize (event) {\n      /**\n       * If autofocus is true, manually set focus to\n       * beginning of content (consistent with Trix behavior)\n       */\n      if (this.autofocus) {\n        this.$refs.trix.editor.setSelectedRange(0)\n      }\n\n      this.$emit('trix-initialize', this.emitInitialize)\n    },\n    handleInitialContentChange (newContent, oldContent) {\n      newContent = newContent === undefined ? '' : newContent\n\n      if (this.$refs.trix.editor && this.$refs.trix.editor.innerHTML !== newContent) {\n        /* Update editor's content when initial content changed */\n        this.editorContent = newContent\n\n        /**\n         *  If user are typing, then don't reload the editor,\n         *  hence keep cursor's position after typing.\n         */\n        if (!this.isActived) {\n          this.reloadEditorContent(this.editorContent)\n        }\n      }\n    },\n    emitEditorState (value) {\n      /**\n       * If localStorage is enabled,\n       * then save editor's content into storage\n       */\n      if (this.localStorage) {\n        localStorage.setItem(\n          this.storageId('VueTrix'),\n          JSON.stringify(this.$refs.trix.editor)\n        )\n      }\n      this.$emit('update', this.editorContent)\n    },\n    storageId (component) {\n      if (this.inputId) {\n        return `${component}.${this.inputId}.content`\n      } else {\n        return `${component}.content`\n      }\n    },\n    reloadEditorContent (newContent) {\n      // Reload HTML content\n      this.$refs.trix.editor.loadHTML(newContent)\n\n      // Move cursor to end of new content updated\n      this.$refs.trix.editor.setSelectedRange(this.getContentEndPosition())\n    },\n    getContentEndPosition () {\n      return this.$refs.trix.editor.getDocument().toString().length - 1\n    },\n    decorateDisabledEditor (editorState) {\n      /** Disable toolbar and editor by pointer events styling */\n      if (editorState) {\n        this.$refs.trix.toolbarElement.style['pointer-events'] = 'none'\n        this.$refs.trix.contentEditable = false\n        this.$refs.trix.style['background'] = '#e9ecef'\n      } else {\n        this.$refs.trix.toolbarElement.style['pointer-events'] = 'unset'\n        this.$refs.trix.style['pointer-events'] = 'unset'\n        this.$refs.trix.style['background'] = 'transparent'\n      }\n    },\n    overrideConfig (config) {\n      Trix.config = this.deepMerge(Trix.config, config)\n    },\n    deepMerge (target, override) {\n      // deep merge the object into the target object\n      for (let prop in override) {\n        if (override.hasOwnProperty(prop)) {\n          if (Object.prototype.toString.call(override[prop]) === '[object Object]') {\n            // if the property is a nested object\n            target[prop] = this.deepMerge(target[prop], override[prop])\n          } else {\n            // for regular property\n            target[prop] = override[prop]\n          }\n        }\n      }\n\n      return target\n    }\n  },\n  computed: {\n    /**\n     * Compute a random id of hidden input\n     * when it haven't been specified.\n     */\n    generateId () {\n      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {\n        var r = Math.random() * 16 | 0\n        var v = c === 'x' ? r : (r & 0x3 | 0x8)\n        return v.toString(16)\n      })\n    },\n    computedId () {\n      return this.inputId || this.generateId\n    },\n    initialContent () {\n      return this.srcContent\n    },\n    isDisabled () {\n      return this.disabledEditor\n    }\n  },\n  watch: {\n    editorContent: {\n      handler: 'emitEditorState'\n    },\n    initialContent: {\n      handler: 'handleInitialContentChange'\n    },\n    isDisabled: {\n      handler: 'decorateDisabledEditor'\n    },\n    config: {\n      handler: 'overrideConfig',\n      deep: true\n    }\n  }\n}\n</script>\n\n<style lang=\"css\" module>\n.trix_container {\n  max-width: 100%;\n  height: auto;\n}\n.trix_container .trix-button-group {\n  background-color: white;\n}\n.trix_container .trix-content {\n  background-color: white;\n}\n</style>\n"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"trix_container":"src-components-trix_container-5Bcy","trix-button-group":"src-components-trix-button-group-2D-J","trix-content":"src-components-trix-content-1TD_"} });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

/*
 * Vue-Trix index.js
 * Author: tranduchanh.ms@gmail.com
 * Github: https://github.com/hanhdt/vue-trix
 */
Vue.config.ignoredElements = ['trix-editor'];

Vue.component(__vue_component__.name, __vue_component__);

export default __vue_component__;
//# sourceMappingURL=vue-trix.esm.js.map
