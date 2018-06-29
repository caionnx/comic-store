import reducer, { cartReducerDefaultState } from '../../reducers/cart'
import * as actions from '../../actions/cart'
import { comics } from '../fixtures/comics'

test('Should set default state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual(cartReducerDefaultState)
})

test('Should add comic to cart', () => {
  const oneComic = comics[0]
  const action = actions.addComicToCart(oneComic)
  const state = reducer(cartReducerDefaultState, action)

  expect(state.items).toEqual([oneComic])
})

test('Should remove comic from cart', () => {
  const oneComic = comics[0]
  const action = actions.removeComicFromCart(oneComic.id)
  const state = reducer(cartReducerDefaultState, action)

  expect(state.items).toEqual([])
})
