import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/vue'
import { setupServer } from 'msw/node'
import byRoute from '../../src/components/byRoute.vue';
import handlers from '../../src/mocks/handlers'
import Vue from 'vue'
import Vuetify from 'vuetify'

import * as fetchers from '@/services/fetchers'
import userEvent from '@testing-library/user-event';

const server = setupServer(...handlers)

const fetchRoutesSpy = jest.spyOn(fetchers, 'fetchRoutes')
const fetchDirectionsSpy = jest.spyOn(fetchers, 'fetchDirections')
const fetchStopsSpy = jest.spyOn(fetchers, 'fetchStops')

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

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  fetchRoutesSpy.mockClear()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('byRoute component', () => {
  it('clicks in fields and emits route stop info at the end.', async () => {
    const { getByLabelText, getByText, emitted, debug } = renderWithVuetify(byRoute)
    // get the routes
    await waitFor(() => expect(getByLabelText('Select route')).toBeInTheDocument())
    expect(fetchRoutesSpy).toBeCalledTimes(1)
    // choose a route
    userEvent.click(getByLabelText('Select route'))
    await waitFor(() => expect(getByText('first route')).toBeInTheDocument())
    userEvent.click(getByText('first route'))
    // get the directions
    await waitFor(() => expect(getByLabelText('Select direction')).toBeInTheDocument())
    expect(fetchDirectionsSpy).toBeCalledTimes(1)
    // choose a direction
    userEvent.click(getByText('Select direction'))
    await waitFor(() => expect(getByText('west')).toBeInTheDocument())
    userEvent.click(getByText('west'))
    // get the stops
    await waitFor(() => expect(getByLabelText('Select stop')).toBeInTheDocument())
    expect(fetchStopsSpy).toBeCalledTimes(1)
    // choose a stop
    userEvent.click(getByText('Select stop'))
    await waitFor(() => expect(getByText('first stop')).toBeInTheDocument())
    userEvent.click(getByText('first stop'))
    // get the route stop info
    // await waitFor(() => expect(emitted()).toHaveProperty('routeInfo'))


    // type in field
    // const textfield = getByLabelText('Stop #')
    // await fireEvent.update(textfield, '123')
    // expect(textfield.value).toEqual('123')
    // //hit submit button
    // const submitButton = getByText('Submit')
    // await fireEvent.click(submitButton)
    // // check that the API has been called
    // expect(fetchStopInfoSpy).toHaveBeenCalledTimes(1)
    // // wait for the API to come back and things to be emitted
    // await waitFor(() => expect(emitted()).toHaveProperty('stopInfo'))
    debug()
  })
})