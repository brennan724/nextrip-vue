import { setupWorker } from 'msw'
import handlers from './handlers'

// this is only used if setting up a dev environment/service workers using mocks
// since i'm not doing that, this is just here in case it is needed later.
export const worker = setupWorker(...handlers)