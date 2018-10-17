import { shallowMount } from '@vue/test-utils'
import VueTrix from '../../src/components/VueTrix.vue'

describe('VueTrix.vue', () => {
  it('renders trix-editor when passed', () => {
    const wrapper = shallowMount(VueTrix)

    // assert the component is rendered
    expect(wrapper.is(VueTrix)).toBe(true)

    // assert the trix-editor is rendered
    expect(wrapper.find('.trix-content').exists()).toBe(true)
  })
})
