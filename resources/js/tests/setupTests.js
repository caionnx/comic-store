import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DotEnv from 'dotenv'
import { request } from './fixtures/comics'

Enzyme.configure({
  adapter: new Adapter()
})

DotEnv.config({ path: '.env.test' })

// Mock Marvel API to resolve mock data
const mockRequestData = request.data
jest.mock('../api/marvelApi', () => ({
  getComics: () => new Promise(resolve => {
    resolve(mockRequestData)
  })
}))
