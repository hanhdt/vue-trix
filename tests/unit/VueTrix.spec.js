import {
  shallowMount,
  mount
} from '@vue/test-utils'
import VueTrix from '../../src/components/VueTrix.vue'

describe('VueTrix.vue', () => {
  it('renders valid elements', () => {
    const wrapper = mount(VueTrix)

    // assert the component is rendered
    expect(wrapper.getComponent(VueTrix).exists()).toBe(true)

    // assert the trix-editor is rendered
    expect(wrapper.find('trix-editor').exists()).toBe(true)
    expect(wrapper.find('trix-editor').attributes().input).toBeDefined()

    // assert the hidden input is rendered
    expect(wrapper.find('input').exists()).toBe(true)
    // expect(wrapper.find('input').attributes('id')).toBeDefined()
  })

  it('has initial props', () => {
    const props = {
      inputId: 'inputId',
      inputName: 'content',
      placeholder: 'placeholder',
      srcContent: 'srcContent',
      localStorage: true,
      autofocus: true
    }

    const wrapper = shallowMount(VueTrix, { props })

    // assert component props correctly
    Object.keys(props).forEach(key => {
      expect(wrapper.props()[key]).toBe(props[key])
    })
  })

  it('has valid hidden input', () => {
    const wrapper = mount(VueTrix, {
      props: {
        inputId: 'inputId',
        inputName: 'content',
        srcContent: 'srcContent',
        placeholder: 'placeholder'
      }
    })

    // get hidden input element
    const inputWrapper = wrapper.find('input')
    const inputEl = inputWrapper.element

    // assert hidden input attributes
    expect(inputEl.value).toEqual('srcContent')
    expect(inputEl.id).toEqual('inputId')
    expect(inputEl.name).toEqual('content')
  })

  it('has valid trix-editor attributes', () => {
    const wrapper = mount(VueTrix, {
      props: {
        inputId: 'inputId',
        inputName: 'content',
        initContent: 'initContent',
        placeholder: 'placeholder'
      }
    })

    // get trix-editor element
    const trixWrapper = wrapper.find('trix-editor')

    // assert attributes
    expect(trixWrapper.attributes().class).toBe('trix-content')
    expect(trixWrapper.attributes().role).toBe('textbox')
    expect(trixWrapper.attributes().placeholder).toBe('placeholder')
  })

  it('works with v-model directive', () => {
    const wrapper = mount(VueTrix, {
      props: {
        srcContent: 'init content'
      }
    })

    const inputWrapper = wrapper.find('input[type="hidden"]')

    // Has the connect starting value
    expect(wrapper.props().srcContent).toEqual('init content')
    expect(inputWrapper.element.value).toEqual('init content')

    // Sets the input to the correct value when props change
    wrapper.setProps({ srcContent: 'new content' })
    expect(wrapper.vm.initialContent).toEqual('new content')
  })
})
