export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMIC':
      return [...state, action.comic]
    case 'REMOVE_COMIC':
      return state.filter(c => c.id !== action.id)
    case 'EDIT_COMIC':
      return state.map((comic) =>
        comic.id === action.id
          ? { ...comic, ...action.updates }
          : comic
      )
    default:
      return state
  }
}
