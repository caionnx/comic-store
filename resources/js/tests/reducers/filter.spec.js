import reducer, { filterReducerDefaultState } from '../../reducers/filter'
import * as actions from '../../actions/filter'

test('Should set default state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual(filterReducerDefaultState)
})

test('Should set text filter', () => {
  const text = 'avengers'
  const action = actions.setText(text)
  const state = reducer(undefined, action)

  expect(state.text).toEqual(text)
})

test('Should set search params of filter', () => {
  const params = {count: 145, total: 15412, offset: 0, limit: 3}
  const action = actions.setSearchParams(params)
  const state = reducer(undefined, action)

  expect(state.searchParams).toEqual(params)
})
