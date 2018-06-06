import * as actions from '../../actions/fetching'

test('Should setup toogle full fetching action object', () => {
  const action = actions.toggleFull()
  expect(action).toEqual({
    type: 'TOGGLE_FULL'
  })
})

test('Should setup toogle parcial fetching action object', () => {
  const action = actions.toggleParcial()
  expect(action).toEqual({
    type: 'TOGGLE_PARCIAL'
  })
})
