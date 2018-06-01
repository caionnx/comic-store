const fetchingReducerDefaultState = {
  full: false,
  parcial: false
}

export default (state = fetchingReducerDefaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_FULL':
      return {
        ...state,
        full: !state.full
      }
    case 'TOGGLE_PARCIAL':
      return {
        ...state,
        parcial: !state.parcial
      }
    default:
      return state
  }
}
