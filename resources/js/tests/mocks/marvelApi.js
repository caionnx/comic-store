import { request } from '../fixtures/comics'

// Mock Marvel API to resolve mock data
const mockRequestData = request.data
jest.mock('../../api/marvelApi', () => ({
  getComics: () => new Promise(resolve => {
    resolve(mockRequestData)
  })
}))
