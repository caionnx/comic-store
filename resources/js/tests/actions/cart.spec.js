import * as actions from '../../actions/cart'
import { comics } from '../fixtures/comics'

test('Should setup add comic to cart action object', () => {
  const action = actions.addComicToCart(comics[0])
  expect(action).toEqual({
    type: 'ADD_COMIC',
    comic: comics[0]
  })
})

test('Should setup remove comic from cart action object', () => {
  const action = actions.removeComicFromCart(comics[0].id)
  expect(action).toEqual({
    type: 'REMOVE_COMIC',
    id: comics[0].id
  })
})
