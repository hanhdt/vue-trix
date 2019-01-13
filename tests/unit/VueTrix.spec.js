import { shallowMount, mount } from '@vue/test-utils'
import VueTrix from '../../src/components/VueTrix.vue'

describe('VueTrix.vue', () => {
  it('renders trix-editor when passed', () => {
    const wrapper = shallowMount(VueTrix)

    // assert the component is rendered
    expect(wrapper.is(VueTrix)).toBe(true)
    // assert the trix-editor is rendered
    expect(wrapper.contains('trix-editor')).toBe(true)
  })

  it('init default props', () => {
    const wrapper = shallowMount(VueTrix, {
      propsData: {
        initContent: 'aaa'
      }
    })

    // assert props correctly
    expect(wrapper.props().inputId).toBe('')
    expect(wrapper.props().placeholder).toBe('')

    const inputWrapper = wrapper.find('input')
    const inputEl = inputWrapper.element

    // Has the connect starting value
    expect(inputEl.value).toEqual('aaa')
  })

  it('have attributes when passed', () => {
    const wrapper = shallowMount(VueTrix)

    // assert attributes
    expect(wrapper.find('trix-editor').attributes().class).toBe('trix-content')
    expect(wrapper.find('trix-editor').attributes().role).toBe('textbox')
    expect(wrapper.find('trix-editor').attributes().placeholder).toBe('')
  })

  it('works with v-model', () => {
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
    wrapper.setProps({ initContent: 'new content' })
    expect(inputEl.value).toEqual('new content')
  })
})
