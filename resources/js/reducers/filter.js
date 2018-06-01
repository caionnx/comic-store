const filterReducerDefaultState = {
  text: null,
  count: 0,
  offset: 0,
  total: 0,
  limit: 20,
  minimal: {
    dateDescriptor: 'thisWeek'
  }
}

export default (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text
      }
    case 'SET_COUNT':
      return {
        ...state,
        count: action.count
      }
    case 'SET_TOTAL':
      return {
        ...state,
        total: action.total
      }
    case 'SET_OFFSET':
      return {
        ...state,
        offset: action.offset
      }
    default:
      return state
  }
}
