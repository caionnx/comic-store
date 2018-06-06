import * as actions from '../../actions/filter'

test('Should setup set filter text action object', () => {
  const text = 'Avengers'
  const action = actions.setText(text)
  expect(action).toEqual({
    type: 'SET_TEXT',
    text
  })
})

test('Should setup set filter params action object', () => {
  const params = { limit: 10, count: 58988 }
  const action = actions.setSearchParams(params)
  expect(action).toEqual({
    type: 'SET_SEARCH_PARAMS',
    params
  })
})
