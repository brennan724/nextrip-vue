import '@testing-library/jest-dom'
import { render } from '@testing-library/vue'
import HelloWorld from '../../src/components/HelloWorld.vue';

it('it renders correctly', () => {
    console.log('running this test')
    const { getByText } = render(HelloWorld)
    getByText('Essential Links')
})