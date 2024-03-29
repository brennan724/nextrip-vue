import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import dropdown from '../../src/components/dropdown.vue';
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify);

const renderWithVuetify = (component, options, callback) => {
  const root = document.createElement('div')
  root.setAttribute('data-app', 'true')
  return render(
    component,
    {
      container: document.body.appendChild(root),
      // for Vuetify components that use the $vuetify instance property
      vuetify: new Vuetify(),
      ...options,
    },
    callback,
  )
}

describe('dropdown component', () => {
  it('should show a dropdown', async () => {
    const { getByText, emitted } = renderWithVuetify(dropdown, {
      props: {
        dropdownData: [{ id: '1', label: 'haha' }, { id: '2', label: 'business' }],
        category: 'first',
        selected: '',
      }
    })
    // find the dropdown and make sure it's empty
    const select = getByText('Select first')
    expect(select.value).toBe(undefined)
    // click the dropdown and then select one of the options
    userEvent.click(select)
    await waitFor(() => expect(getByText('haha')).toBeInTheDocument())
    const hahaField = getByText('haha')
    userEvent.click(hahaField)
    // check that the dropdown emits properly to whatever called it
    expect(emitted()).toHaveProperty('clicked')
  })
})