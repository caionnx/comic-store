export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMIC':
      return [...state, action.comic]
    case 'REMOVE_COMIC':
      return state.filter(c => c.id !== action.id)
    default:
      return state
  }
}
