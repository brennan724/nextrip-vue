import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/vue'
import { setupServer } from 'msw/node'
import byStop from '../../src/components/byStop.vue';
import handlers from '../../src/mocks/handlers'
import Vue from 'vue'
import Vuetify from 'vuetify'

import * as fetchers from '@/services/fetchers'

Vue.use(Vuetify);

const server = setupServer(...handlers)

const fetchStopInfoSpy = jest.spyOn(fetchers, 'fetchFromStopNum')

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  fetchStopInfoSpy.mockClear()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('byStop component', () => {
  it('types in field and emits the value on submit', async () => {
    const { getByLabelText, getByText, emitted } = render(byStop)
    // type in field
    const textfield = getByLabelText('Stop #')
    await fireEvent.update(textfield, '123')
    expect(textfield.value).toEqual('123')
    //hit submit button
    const submitButton = getByText('Submit')
    await fireEvent.click(submitButton)
    // check that the API has been called
    expect(fetchStopInfoSpy).toHaveBeenCalledTimes(1)
    // wait for the API to come back and things to be emitted
    await waitFor(() => expect(emitted()).toHaveProperty('stopInfo'))
  })
})