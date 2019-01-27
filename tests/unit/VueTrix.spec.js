import {
  shallowMount,
  mount
} from '@vue/test-utils'
import VueTrix from '../../src/components/VueTrix.vue'

describe('VueTrix.vue', () => {
  it('renders valid elements', () => {
    const wrapper = mount(VueTrix)

    // assert the component is rendered
    expect(wrapper.is(VueTrix)).toBe(true)

    // assert the trix-editor is rendered
    expect(wrapper.contains('trix-editor')).toBe(true)
    expect(wrapper.find('trix-editor').attributes().input).toBeDefined()

    // assert the hidden input is rendered
    expect(wrapper.contains('input')).toBe(true)
    expect(wrapper.find('input').attributes().id).toBeDefined()
  })

  it('has initial props', () => {
    const wrapper = shallowMount(VueTrix, {
      propsData: {
        inputId: 'inputId',
        inputName: 'content',
        initContent: 'initContent',
        placeholder: 'placeholder'
      }
    })

    // assert component props correctly
    expect(wrapper.props().inputId).toBe('inputId')
    expect(wrapper.props().inputName).toBe('content')
    expect(wrapper.props().placeholder).toBe('placeholder')
    expect(wrapper.props().initContent).toBe('initContent')
  })

  it('has valid hidden input', () => {
    const wrapper = mount(VueTrix, {
      propsData: {
        inputId: 'inputId',
        inputName: 'content',
        initContent: 'initContent',
        placeholder: 'placeholder'
      }
    })

    // get hidden input element
    const inputWrapper = wrapper.find('input')
    const inputEl = inputWrapper.element

    // assert hidden input attributes
    expect(inputEl.value).toEqual('initContent')
    expect(inputEl.id).toEqual('inputId')
    expect(inputEl.name).toEqual('content')
  })

  it('has valid trix-editor attributes', () => {
    const wrapper = mount(VueTrix, {
      propsData: {
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

  it('works with v-model dirrective', () => {
    const wrapper = mount(VueTrix, {
      propsData: {
        initContent: 'init content'
      }
    })

    const inputWrapper = wrapper.find('input')
    const inputEl = inputWrapper.element

    // Has the connect starting value
    expect(inputEl.value).toEqual('init content')

    // Sets the input to the correct value when props change
    wrapper.setProps({
      initContent: 'new content'
    })
    expect(inputEl.value).toEqual('new content')
  })
})