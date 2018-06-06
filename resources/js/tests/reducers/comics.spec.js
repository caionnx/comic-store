import reducer from '../../reducers/comics'
import * as actions from '../../actions/comics'
import { comics } from '../fixtures/comics'

test('Should set default state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('Should set comics', () => {
  const action = actions.setComics(comics)
  const state = reducer([], action)

  expect(state).toEqual(comics)
})

test('Should add comics to state', () => {
  const moreComics = [comics[0], comics[1]]
  const action = actions.addComics(moreComics)
  const state = reducer(comics, action)

  expect(state).toEqual([...comics, ...moreComics])
})
