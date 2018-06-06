export const filterReducerDefaultState = {
  text: null,
  searchParams: {
    count: 0,
    offset: 0,
    total: 0,
    limit: 20
  },
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
    case 'SET_SEARCH_PARAMS':
      return {
        ...state,
        searchParams: { ...state.searchParams, ...action.params }
      }
    default:
      return state
  }
}
