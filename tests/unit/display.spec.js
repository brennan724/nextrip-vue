import '@testing-library/jest-dom'
import { render } from '@testing-library/vue'
import display from '../../src/components/display.vue';
import Vue from 'vue'
import VueMaterial from "vue-material";

Vue.use(VueMaterial);

describe('display component', () => {
  it('should display a table when given data', async () => {
    const { getAllByText } = render(display, {
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
    const beginning = getAllByText('the beginning')
    expect(beginning.length).toBe(1)
    const stop = getAllByText(/Stop Id/)
    expect(stop.length).toBe(1)
    expect(stop[0]).toHaveTextContent('1001')
    const route = getAllByText('road to nowhere')
    expect(route.length).toBe(2)
    const stops = getAllByText(/stop/)
    expect(stops.length).toBe(2)
    const time = getAllByText(/mins/)
    expect(time.length).toBe(2)
  })
})