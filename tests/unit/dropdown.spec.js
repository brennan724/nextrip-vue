import '@testing-library/jest-dom'
import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import dropdown from '../../src/components/dropdown.vue';
import Vue from 'vue'
import VueMaterial from "vue-material";

Vue.use(VueMaterial);

describe('dropdown component', () => {
  it('should show a dropdown', async () => {
    const { getByText } = render(dropdown, {
      props: {
        dropdownData: [{ id: '1', label: 'haha' }, { id: '2', label: 'business' }],
        category: 'first',
        selected: '',
      }
    })
    const select = getByText('Select first')
    expect(select.value).toBe(undefined)
    userEvent.click(select)
    // const hahaField = getByText('haha')
    // userEvent.click(hahaField)
    // debug()
  })
})


// function render(Component, options, callbackFunction) {
//   return {
//     ...DOMTestingLibraryQueries,
//     container,
//     baseElement,
//     debug,
//     unmount,
//     isUnmounted,
//     html,
//     emitted,
//     updateProps,
//   }
// }