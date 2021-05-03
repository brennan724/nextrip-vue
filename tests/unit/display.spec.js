import '@testing-library/jest-dom'
import { render } from '@testing-library/vue'
import display from '../../src/components/display.vue';
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify);
new Vuetify({})

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

describe('display component', () => {
  it('should display a table when given data', async () => {
    const { getAllByText } = renderWithVuetify(display, {
      props: {
        displayInfo: {
          departures: [
            {
              route_short_name: 'road to nowhere',
              description: 'first stop',
              departure_text: '2 mins',
            },
            {
              route_short_name: 'road to nowhere',
              description: 'last stop',
              departure_text: '10 mins',
            }
          ],
          stops: [{
            description: 'the beginning',
            stop_id: 1001,
          }]
        }
      }
    })
    // check that the header text exists, and is there only once
    const beginning = getAllByText('the beginning')
    expect(beginning.length).toBe(1)
    // check that the stop ID is there and it's the right number
    const stop = getAllByText(/Stop Id/)
    expect(stop.length).toBe(1)
    expect(stop[0]).toHaveTextContent('1001')
    // check that the route info, stop info, and minutes to arrival
    //  are there the proper number of times
    const route = getAllByText('road to nowhere')
    expect(route.length).toBe(2)
    const stops = getAllByText(/stop/)
    expect(stops.length).toBe(2)
    const time = getAllByText(/mins/)
    expect(time.length).toBe(2)
  })
})