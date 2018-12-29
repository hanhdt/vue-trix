import { shallowMount } from '@vue/test-utils'
import VueTrix from '../../src/components/VueTrix.vue'

describe('VueTrix.vue', () => {
  it('renders trix-editor when passed', () => {
    const component = shallowMount(VueTrix)

    // assert the component is rendered
    expect(component.is(VueTrix)).toBe(true)

    // assert the trix-editor is rendered
    expect(component.contains('trix-editor')).toBe(true)
  })

  it('init default props', () => {
    const component = shallowMount(VueTrix)

    // assert props
    expect(component.props().inputId).toBe('')
    expect(component.props().initContent).toBe('')
    expect(component.props().placeholder).toBe('')
  })

  it('have attributes when passed', () => {
    const component = shallowMount(VueTrix)

    // assert attributes
    expect(component.find('trix-editor').attributes().class).toBe('trix-content')
    expect(component.find('trix-editor').attributes().role).toBe('textbox')
    expect(component.find('trix-editor').attributes().placeholder).toBe('')
  })
})
