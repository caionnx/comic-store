import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '../mocks/marvelApi'
import * as actions from '../../actions/comics'
import { comics, request } from '../fixtures/comics'

const createMockStore = configureMockStore([thunk])

test('Should setup set comics action object', () => {
  const action = actions.setComics(comics)
  expect(action).toEqual({
    type: 'SET_COMICS',
    comics
  })
})

test('Should setup add comics action object', () => {
  const action = actions.addComics(comics)
  expect(action).toEqual({
    type: 'ADD_COMICS',
    comics
  })
})

test('Should start set comics from API', (done) => {
  const store = createMockStore([])

  store.dispatch(actions.startSetComics({ dateDescriptor: 'thisWeek' })).then((dataFromRequest) => {
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: 'SET_COMICS',
      comics
    })
    expect(dataFromRequest.offset).toBe(request.data.offset)
    expect(dataFromRequest.count).toBe(request.data.count)
    expect(dataFromRequest.total).toBe(request.data.total)

    done()
  })
})

test('Should start add comics from API', (done) => {
  const store = createMockStore([])

  store.dispatch(actions.startAddComics({ dateDescriptor: 'thisWeek' })).then((dataFromRequest) => {
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: 'ADD_COMICS',
      comics
    })
    expect(dataFromRequest.offset).toBe(request.data.offset)
    expect(dataFromRequest.count).toBe(request.data.count)
    expect(dataFromRequest.total).toBe(request.data.total)

    done()
  })
})
