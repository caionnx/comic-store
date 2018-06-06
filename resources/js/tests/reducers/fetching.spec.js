import reducer, { fetchingReducerDefaultState } from '../../reducers/fetching'
import * as actions from '../../actions/fetching'

test('Should set default state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual(fetchingReducerDefaultState)
})

test('Should toggle full fetching state', () => {
  const action = actions.toggleFull()
  const state = reducer(undefined, action)
  const expected = !fetchingReducerDefaultState.full

  expect(state.full).toBe(expected)
})

test('Should toggle parcial fetching state', () => {
  const action = actions.toggleParcial()
  const state = reducer(undefined, action)
  const expected = !fetchingReducerDefaultState.parcial

  expect(state.parcial).toBe(expected)
})
