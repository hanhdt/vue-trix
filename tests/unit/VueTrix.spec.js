import { shallowMount } from '@vue/test-utils'
import VueTrix from '../../src/VueTrix.vue'

describe('VueTrix.vue', () => {
  it('renders trix-editor when passed', () => {
    const wrapper = shallowMount(VueTrix)

    // assert the trix-editor is rendered
    expect(wrapper.find('.trix-content').exists()).toBe(true)
  })
})
