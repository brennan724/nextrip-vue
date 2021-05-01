import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/vue'
import byStop from '../../src/components/byStop.vue';
import Vue from 'vue'
import VueMaterial from "vue-material";

Vue.use(VueMaterial);

describe('byStop component', () => {
  it('types in field and emits the value on submit', async () => {
    const { getByLabelText, getByText, emitted, debug } = render(byStop)
    // type in field
    const textfield = getByLabelText('Stop #')
    await fireEvent.update(textfield, '123')
    expect(textfield.value).toEqual('123')
    //hit submit button
    const submitButton = getByText('Submit')
    await fireEvent.click(submitButton)
    // expect(emitted()).toHaveProperty('stopInfo')
    // expect(emitted()).toHaveValue('123')
    debug()

  })
})